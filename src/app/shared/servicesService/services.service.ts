import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientsService } from '../clientsService/clients.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { RecordService } from '../recordService/record.service';
import {deleteObject, getStorage, ref} from "@angular/fire/storage";
import {v4} from "uuid";
import {getDownloadURL, uploadString} from "rxfire/storage";
import {get} from "@angular/fire/database";

export interface service {
  recordId: string;
  price: number;
  time: string;
  id: string;
  photosId: string[];
}

export interface selectedService {
  recordId: string;
  price: number;
  time: string;
  id: string;
  photos: { id: string, url: string }[];
}

export type nullableService = service | null;
export type nullableSelectedService = selectedService | null;

export const API_STATUS = {
  SUCCESSFUL: 'successful',
  FAILED: 'failed',
};

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  selectedService: BehaviorSubject<nullableSelectedService> = new BehaviorSubject(null as nullableSelectedService);
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

  async setSelectedService(id: string) {
    const selectedService: nullableService = this.services.getValue().find((service) => service.id === id) || null;
    if(!selectedService) {
      this.selectedService.next(null)
      return
    }
    if(selectedService.photosId){
      const storage = getStorage()
      const photosUrl: { id: string, url: string }[] = []
      selectedService.photosId.forEach((id, index) => {
        const photoRef = ref(storage, id)
        getDownloadURL(photoRef).subscribe((url) => {
          photosUrl[index] = {id: id, url: url}
          const selectedServiceWithPhoto: selectedService = {
            ...selectedService,
            photos: photosUrl,
          }
          this.selectedService.next(selectedServiceWithPhoto);
        })
      })
    }
    this.selectedService.next({...selectedService, photos:[]})
  }

  async updateService(service: selectedService) {
    const index = this.services.getValue().findIndex((value) => value.id === service.id);
    const key = this.serviceMetaRef[index].key;
    const newIds = service.photos.map((photo) => photo.id || v4())
    const serviceWithPhotoId: service = {
      recordId: service.recordId,
      price: service.price,
      time: service.time,
      id: service.id,
      photosId: newIds
    }
    const storage = getStorage()
    console.log(service.photos)
    service.photos.filter(photo => photo.id === null).forEach(({url, id}, index) => {
      const imgRef = ref(storage, newIds[index])
      uploadString(imgRef, url, 'data_url')
    })

    this.serviceRef
      .update(key, serviceWithPhotoId)
      .then(() => this.apiStatus.next(API_STATUS.SUCCESSFUL))
      .catch(() => this.apiStatus.next(API_STATUS.FAILED));
  }

  isRecordFinalised(recordId: string): boolean {
    return this.services.getValue().some((service) => service.recordId === recordId);
  }

  createService(service: service, photos: { url: string; type: string }[]) {
    const photosUrl = photos.map((photo: { url: string; type: string }, index) => ({data: photo.url, id: service.photosId[index]}))
    const storage = getStorage()

    photosUrl.forEach((photoUrl) => {
      const imgRef = ref(storage, photoUrl.id)
      uploadString(imgRef, photoUrl.data, 'data_url')
    })
    this.serviceRef
      .push(service)
      .then(() => this.apiStatus.next(API_STATUS.SUCCESSFUL))
      .catch(() => this.apiStatus.next(API_STATUS.FAILED));
  }

  getServicesById(clientId = '-1'): service[] {
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
