import { Injectable } from '@angular/core';
import { record } from '../recordService/record.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClientsService } from '../clientsService/clients.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

export interface service {
  recordId: string;
  price: number;
  time: string;
  id: string;
}

export type nullableService = service | null;

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  selectedService: BehaviorSubject<nullableService> = new BehaviorSubject(null as nullableService);
  serviceRef: AngularFireList<service>;
  serviceMetaRef: any[] = [];
  services: BehaviorSubject<service[]> = new BehaviorSubject([] as service[]);

  constructor(private clientService: ClientsService, db: AngularFireDatabase) {
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

  setNullSelectedService() {
    this.selectedService.next(null);
  }

  updateService(service: service) {
    const index = this.services.getValue().findIndex((value) => value.id === service.id);
    const key = this.serviceMetaRef[index].key;
    this.serviceRef.update(key, service);
  }

  createService(service: service) {
    this.serviceRef.push(service);
  }

  setNullService() {
    this.selectedService.next(null);
  }
}
