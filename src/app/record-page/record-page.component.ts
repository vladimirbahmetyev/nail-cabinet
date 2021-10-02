import { Component, OnInit } from '@angular/core';
import {recordsMock} from "./recordMock";
import {clientsMock} from "../clients-page/mockFile";

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.sass']
})
export class RecordPageComponent implements OnInit {

  records = recordsMock
  clients = clientsMock

  RECORD_PAGE_VIEWS = {
    CALENDAR_VIEW: 'calendar',
    ADD_RECORD_VIEW: 'addRecord',
    EDIT_RECORD_VIEW: 'editRecord'
  }

  pageView = this.RECORD_PAGE_VIEWS.CALENDAR_VIEW

  constructor() { }

  ngOnInit(): void {
  }

  todayClients = recordsMock.map(record => ({
    ...record,
      client: this.clients.find(client => client?.id === record.clientId)
  }))

  selected: Date | null = new Date()

  onDateChanged(date: Date) {
    this.selected = date;
  }

  onBackClick(): void {
    this.pageView = this.RECORD_PAGE_VIEWS.CALENDAR_VIEW
  }

  onAddClick():void {
    this.pageView = this.RECORD_PAGE_VIEWS.ADD_RECORD_VIEW
  }

  onEditClick():void {
    this.pageView = this.RECORD_PAGE_VIEWS.EDIT_RECORD_VIEW
  }
}
