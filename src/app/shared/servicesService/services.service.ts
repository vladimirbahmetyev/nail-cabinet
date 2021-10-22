import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientsService } from '../clientsService/clients.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { RecordService } from '../recordService/record.service';

export interface service {
  recordId: string;
  price: number;
  time: string;
  id: string;
  photo: string[];
}

export type nullableService = service | null;

export const API_STATUS = {
  SUCCESSFUL: 'successful',
  FAILED: 'failed',
};

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  selectedService: BehaviorSubject<nullableService> = new BehaviorSubject(null as nullableService);
  serviceRef: AngularFireList<service>;
  serviceMetaRef: any[] = [];
  services: BehaviorSubject<service[]> = new BehaviorSubject([] as service[]);
  apiStatus: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private clientService: ClientsService,
    private recordService: RecordService,
    db: AngularFireDatabase,
  ) {
    this.serviceRef = db.list<service>('services');
    this.serviceRef.valueChanges().subscribe((value) => {
      this.services.next(value);
    });
    this.serviceRef.snapshotChanges().subscribe((value) => {
      this.serviceMetaRef = value;
    });
  }

  setSelectedService(id: string) {
    const selectedService = this.services.getValue().find((service) => service.id === id) || null;
    this.selectedService.next(selectedService);
  }

  updateService(service: service) {
    const index = this.services.getValue().findIndex((value) => value.id === service.id);
    const key = this.serviceMetaRef[index].key;
    this.serviceRef
      .update(key, service)
      .then(() => this.apiStatus.next(API_STATUS.SUCCESSFUL))
      .catch(() => this.apiStatus.next(API_STATUS.FAILED));
  }

  createService(service: service) {
    this.serviceRef
      .push(service)
      .then(() => this.apiStatus.next(API_STATUS.SUCCESSFUL))
      .catch(() => this.apiStatus.next(API_STATUS.FAILED));
  }

  getServicesById(clientId: string = '-1'): service[] {
    const clientRecordIds = this.recordService
      .getRecordsByClientId(clientId)
      .map((record) => record.id);
    return this.services
      .getValue()
      .filter((service) => clientRecordIds.some((recordId) => service.recordId === recordId));
  }

  getLastService(clientId: string): nullableService {
    const clientServices = this.getServicesById(clientId);
    if (clientServices.length === 0) {
      return null;
    }
    return clientServices.reduce((prev, current) => {
      const prevDateString = this.recordService.getRecordById(prev.recordId)?.date;
      const prevDate = prevDateString ? new Date(prevDateString) : new Date();
      const currentDateString = this.recordService.getRecordById(current.recordId)?.date;
      const currentDate = currentDateString ? new Date(currentDateString) : new Date();
      return currentDate < prevDate ? prev : current;
    });
  }

  setNullSelectedService() {
    this.selectedService.next(null);
  }
}
