import { Injectable } from '@angular/core';
import {serviceMock} from "../clientsService/clients.service";
import {service} from "../clientsService/clients.service";

export const recordsMock : record[] = [
  {
    clientId: '1',
    date: new Date(),
    service: serviceMock[0],
    comment: '',
  },
  {
    clientId: '2',
    date: new Date(),
    service: serviceMock[2],
    comment: '',
  },
  {
    clientId: '3',
    date: new Date(),
    service: serviceMock[3],
    comment: '',
  }
]

export type record = {
  clientId: string,
  date: Date,
  service: service,
  comment: string,
}

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  records = recordsMock

  constructor() { }
}
