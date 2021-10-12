import {Component, OnInit} from '@angular/core';
import {client, ClientsService} from "../shared/clientsService/clients.service";
import {record, RecordService} from "../shared/recordService/record.service";

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.sass']
})
export class RecordPageComponent implements OnInit {

  records: any[] = []
  clients: client[] = []

  RECORD_PAGE_VIEWS = {
    CALENDAR_VIEW: 'calendar',
    ADD_RECORD_VIEW: 'addRecord',
    EDIT_RECORD_VIEW: 'editRecord'
  }

  pageView = this.RECORD_PAGE_VIEWS.CALENDAR_VIEW

  constructor(private clientService: ClientsService, private recordService : RecordService) {}

  ngOnInit(): void {
    this.clientService.clients.subscribe(value => {
      this.clients = value
    })
    this.recordService.dayRecords.subscribe(value => {
      this.records = value.map(record => {
        return {
          ...record,
          client: this.clientService.clients.getValue().find(client => client.id === record.clientId)
        }
      })
    })
  }

  selectedDate: Date  = new Date()

  onDateChanged(date: Date) {
    this.selectedDate = date;
    this.recordService.setDate(date)
  }

  onBackClick(): void {
    this.recordService.setNullRecord()
    this.pageView = this.RECORD_PAGE_VIEWS.CALENDAR_VIEW
  }

  onAddClick():void {
    this.pageView = this.RECORD_PAGE_VIEWS.ADD_RECORD_VIEW
  }

  onEditClick(id: string):void {
    this.recordService.setSelectedRecord(id)
    this.pageView = this.RECORD_PAGE_VIEWS.EDIT_RECORD_VIEW
  }
}
