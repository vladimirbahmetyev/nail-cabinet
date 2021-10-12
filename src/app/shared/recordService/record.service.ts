import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";


export interface record {
  name: number[],
  clientId: string,
  date: Date,
  id: string,
  comment: string,
}

export type nullableRecord = record | null

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  recordsRef : AngularFireList<record>
  selectedRecord : BehaviorSubject<nullableRecord> = new BehaviorSubject(null as nullableRecord)
  records: BehaviorSubject<record[]> = new BehaviorSubject([] as record[])
  recordsMetaRef: any

  constructor(private db: AngularFireDatabase) {
    this.recordsRef = db.list('records')
    this.recordsRef.valueChanges().subscribe(
      value => {
        this.records.next(value)
      }
    )
    this.recordsRef.snapshotChanges().subscribe(value => {
      this.recordsMetaRef = value
    })
  }

  createRecord(record: record) {
    this.recordsRef.push(record)
  }

  setSelectedRecord(id: string){
    const newRecord = this.records.getValue().find(record => record.id === id) || null
    this.selectedRecord.next(newRecord)
  }

  setNullRecord() {
    this.selectedRecord.next(null)
  }
}
