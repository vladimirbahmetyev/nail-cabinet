import {Injectable} from '@angular/core';
import {record} from "../recordService/record.service";
import {BehaviorSubject} from "rxjs";
import {ClientsService, nullableService} from "../clientsService/clients.service";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  selectedService : BehaviorSubject<nullableService>  = new BehaviorSubject(null as nullableService)

  constructor(private clientService: ClientsService) { }

  setSelectedService(id: string) {
    const client = this.clientService.selectedClient.getValue()
    const service = client?.services.find(service => service?.id === id) || null
    this.selectedService.next(service)
  }
  setNullService (){
    this.selectedService.next(null)
  }
}

export interface service extends record {
  price: number,
  time: number,
  id: string,
}

export const serviceMock: service[] = [
  {
    name: 'Гель-лак',
    price: 1200,
    date: new Date,
    time: 60,
    comment: '',
    id: '1',
    clientId: '1',
  },
  {
    name: 'Маникюр',
    price: 500,
    date: new Date,
    time: 40,
    comment: '',
    id: '2',
    clientId: '2',
  },
  {
    name: 'Дизайн',
    price: 200,
    date: new Date,
    time: 50,
    comment: '',
    id: '3',
    clientId: '3',
  },
  {
    name: 'Укрепление',
    price: 100,
    date: new Date,
    time: 20,
    comment: '',
    id: '4',
    clientId: '4',
  },
]
