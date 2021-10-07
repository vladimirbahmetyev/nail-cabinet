import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export type service = {
  name: string,
  price: number,
  time: number,
  comment: string,
  date: Date
  id: string,
} | null

export const serviceMock: service[] = [
  {
    name: 'Гель-лак',
    price: 1200,
    date: new Date,
    time: 60,
    comment: '',
    id: '1',
  },
  {
    name: 'Маникюр',
    price: 500,
    date: new Date,
    time: 40,
    comment: '',
    id: '2',
  },
  {
    name: 'Дизайн',
    price: 200,
    date: new Date,
    time: 50,
    comment: '',
    id: '3',
  },
  {
    name: 'Укрепление',
    price: 100,
    date: new Date,
    time: 20,
    comment: '',
    id: '4',
  },
]

export const clientsMock: client[] = [
  {
    name: 'John Doe',
    date: new Date,
    id: '1',
    services: serviceMock,
    phone: null,
    instagram: 'dickhead'
  },
  {
    name: 'Katya',
    date: new Date,
    id: '2',
    services: serviceMock,
    phone: null,
    instagram: 'dickhead2323'
  },
  {
    name: 'Vladimir',
    date: new Date,
    id: '3',
    services: serviceMock,
    phone: '2323231',
    instagram: null,
  }
  ,
  {
    name: 'Vladimir',
    date: new Date,
    id: '4',
    services: serviceMock,
    phone: '2323231',
    instagram: null,
  }
  ,
  {
    name: 'Vladimir',
    date: new Date,
    id: '5',
    services: serviceMock,
    phone: '23232231',
    instagram: 'kdmfkdmf',
  }
  ,
  {
    name: 'Vladimir',
    date: new Date,
    id: '6',
    services: serviceMock,
    phone: '23232311111',
    instagram: null,
  }
  ,
]

export type client = {
  name: string,
  date: Date,
  id: string,
  phone: string | null,
  instagram: string | null,
  services: service[]
} | null

@Injectable({
  providedIn: 'root'
})
export class ClientsService{

  clients : client[] = clientsMock
  selectedClient : BehaviorSubject<client> = new BehaviorSubject(null as client)
  selectedService : BehaviorSubject<service> = new BehaviorSubject<service>(null as service)

  setSelectedClient(id: string | null) {
    if(id === null) {
      this.selectedClient.next(null)
      return
    }
    const client  = this.clients.find(client => client?.id === id) || null
    this.selectedClient.next(client)
  }

  setSelectedService(id: string | null) {
    if(id === null) {
      this.selectedService.next(null)
      return
    }
    const client = this.selectedClient.getValue()
    const service = client?.services.find(service => service?.id === id) || null
    this.selectedService.next(service)
  }

  constructor() { }
}
