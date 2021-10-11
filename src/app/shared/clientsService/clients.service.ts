import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {service, serviceMock} from "../servicesService/services.service";

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

export interface client{
  name: string,
  date: Date,
  id: string,
  phone: string | null,
  instagram: string | null,
  services: service[]
}

export type nullableClient = client | null
export type nullableService = service | null

@Injectable({
  providedIn: 'root'
})
export class ClientsService{

  clients : client[] = clientsMock
  public selectedClient : BehaviorSubject<nullableClient>  = new BehaviorSubject(null as nullableClient)

  setSelectedClient(id: string) {
    const client  = this.clients.find(client => client?.id === id) || null
    this.selectedClient.next(client)
  }

  setNullClient() {
    this.selectedClient.next(null)
  }

  constructor() { }
}
