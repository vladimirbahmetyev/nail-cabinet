import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export const recordsMock : record[] = [
  {
    id: '1',
    clientId: '1',
    date: new Date(),
    comment: '',
    name: 'kek'
  },
  {
    id: '2',
    clientId: '2',
    date: new Date(),
    comment: '',
    name: 'lol'
  },
  {
    id: '3',
    clientId: '3',
    date: new Date(),
    comment: '',
    name: 'cheburek'
  }
]

export interface record {
  name: string,
  clientId: string,
  date: Date,
  id: string,
  comment: string,
}

type nullableRecord = record | null

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  records = recordsMock

  selectedRecord : BehaviorSubject<nullableRecord> = new BehaviorSubject(null as nullableRecord)

  setSelectedRecord(id: string){
    const newRecord = this.records.find(record => record.id === id) || null
    this.selectedRecord.next(newRecord)
  }

  setNullRecord() {
    this.selectedRecord.next(null)
  }

  constructor() { }
}
