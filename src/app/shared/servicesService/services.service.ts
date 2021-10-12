import {Injectable} from '@angular/core';
import {record} from "../recordService/record.service";
import {BehaviorSubject} from "rxjs";
import {ClientsService, nullableService} from "../clientsService/clients.service";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

export interface service extends record {
  price: number,
  time: number,
  id: string,
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  selectedService : BehaviorSubject<nullableService>  = new BehaviorSubject(null as nullableService)
  serviceRef: AngularFireList<service>

  constructor(private clientService: ClientsService, db: AngularFireDatabase) {
    this.serviceRef = db.list<service>('services')
  }

  // addService()

  setSelectedService(id: string) {
    const client = this.clientService.selectedClient.getValue()
    const service = client?.services.find(service => service?.id === id) || null
    this.selectedService.next(service)
  }

  setNullService (){
    this.selectedService.next(null)
  }
}

