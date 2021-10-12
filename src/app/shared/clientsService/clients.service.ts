import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {service, serviceMock} from "../servicesService/services.service";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

export const clientsMock: client[] = [
  {
    name: 'John Doe',
    id: '1',
    services: serviceMock,
    phone: null,
    instagram: 'dickhead'
  },
  {
    name: 'Katya',
    id: '2',
    services: serviceMock,
    phone: null,
    instagram: 'dickhead2323'
  },
  {
    name: 'Vladimir',
    id: '3',
    services: serviceMock,
    phone: '2323231',
    instagram: null,
  }
  ,
  {
    name: 'Vladimir',
    id: '4',
    services: serviceMock,
    phone: '2323231',
    instagram: null,
  }
  ,
  {
    name: 'Vladimir',
    id: '5',
    services: serviceMock,
    phone: '23232231',
    instagram: 'kdmfkdmf',
  }
  ,
  {
    name: 'Vladimir',
    id: '6',
    services: serviceMock,
    phone: '23232311111',
    instagram: null,
  }
  ,
]

export interface client{
  name: string,
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

  clients : BehaviorSubject<client[]> = new BehaviorSubject([] as client[])
  public selectedClient : BehaviorSubject<nullableClient>  = new BehaviorSubject(null as nullableClient)

  clientsRef : AngularFireList<client>
  clientsMetaRef: any[] = []

  createClient(newClient: client){
    this.clientsRef.push(newClient)
  }

  setSelectedClient(id: string) {
    const client  = this.clients.getValue().find(client => client?.id === id) || null
    this.selectedClient.next(client)
  }

  setNullClient() {
    this.selectedClient.next(null)
  }

  editClient(newInfo: client){
    const index = this.clients.getValue().findIndex(value => value.id === newInfo.id)
    const key = this.clientsMetaRef[index].key
    this.clientsRef.update(key, newInfo)
  }

  constructor(private db: AngularFireDatabase) {
    this.clientsRef = db.list<client>('clients')
    this.clientsRef.snapshotChanges().subscribe(value => {
      this.clientsMetaRef = value
    })
    this.clientsRef.valueChanges().subscribe(value => {
      this.clients.next(value)
    })
  }
}
