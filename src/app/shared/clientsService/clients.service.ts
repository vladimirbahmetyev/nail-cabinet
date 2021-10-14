import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {service} from "../servicesService/services.service";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

export interface client{
  name: string,
  id: string,
  phone: string | null,
  instagram: string | null,
  services: service[]
}

export type nullableClient = client | null

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
