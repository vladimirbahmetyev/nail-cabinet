import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

export interface record {
  serviceOptionIds: string[];
  clientId: string;
  date: string;
  id: string;
  comment: string;
}

export type nullableRecord = record | null;

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  recordsRef: AngularFireList<record>;
  selectedRecord: BehaviorSubject<nullableRecord> = new BehaviorSubject(null as nullableRecord);
  records: BehaviorSubject<record[]> = new BehaviorSubject([] as record[]);
  recordsMetaRef: any;
  selectedDay: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  dayRecords: BehaviorSubject<record[]> = new BehaviorSubject([] as record[]);

  constructor(private db: AngularFireDatabase) {
    this.filterRecordsByDate.bind(this);
    this.recordsRef = db.list('records');
    this.recordsRef.valueChanges().subscribe((value) => {
      this.records.next(value);
      this.dayRecords.next(this.filterRecordsByDate(this.selectedDay.getValue()));
    });
    this.recordsRef.snapshotChanges().subscribe((value) => {
      this.recordsMetaRef = value;
    });
    this.selectedDay.subscribe((date) => {
      console.log('changing date');
      this.dayRecords.next(this.filterRecordsByDate(date));
    });
  }

  filterRecordsByDate(date: Date) {
    return this.records
      .getValue()
      .filter((record) => {
        const recordDate = new Date(record.date);
        return date.toDateString() === recordDate.toDateString();
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  createRecord(record: record) {
    this.recordsRef.push(record);
  }

  editRecord(editRecord: record) {
    const index = this.records.getValue().findIndex((record) => record.id === editRecord.id);
    const key = this.recordsMetaRef[index].key;
    this.recordsRef.update(key, editRecord);
  }

  setSelectedRecord(id: string) {
    const newRecord = this.records.getValue().find((record) => record.id === id) || null;
    this.selectedRecord.next(newRecord);
  }

  setNullRecord() {
    this.selectedRecord.next(null);
  }

  setDate(date: Date) {
    this.selectedDay.next(date);
  }

  getRecordsByDate(date: Date): record[] {
    return this.records.getValue().filter((record) => {
      date = new Date(record.date);
      console.log(date.toDateString());
      console.log(date.toDateString());
      return date.toDateString() === date.toDateString();
    });
  }
}
