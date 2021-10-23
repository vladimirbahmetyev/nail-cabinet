import { Component, OnInit } from '@angular/core';
import { client, ClientsService } from '../shared/clientsService/clients.service';
import { API_STATUS, record, RecordService } from '../shared/recordService/record.service';
import { ServicesService } from '../shared/servicesService/services.service';

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.sass'],
})
export class RecordPageComponent implements OnInit {
  RECORD_PAGE_VIEWS = {
    CALENDAR_VIEW: 0,
    ADD_RECORD_VIEW: 1,
    EDIT_RECORD_VIEW: 2,
    CHECKOUT_VIEW: 3,
  };
  records: any[] = [];
  clients: client[] = [];
  pageView = this.RECORD_PAGE_VIEWS.CALENDAR_VIEW;
  selectedDate: Date = new Date();

  constructor(
    private clientService: ClientsService,
    private recordService: RecordService,
    private serviceService: ServicesService,
  ) {}

  ngOnInit(): void {
    this.clientService.clients.subscribe((value) => {
      this.clients = value;
    });
    this.recordService.dayRecords.subscribe((value) => {
      this.records = value.map((record) => {
        return {
          ...record,
          client: this.clientService.clients
            .getValue()
            .find((client) => client.id === record.clientId),
        };
      });
    });
    this.serviceService.services.subscribe(() => {
      if (this.records.length === 0) {
        return;
      }
      this.records.forEach((record) => {
        record.isFinished = this.serviceService.isRecordFinalised(record.id);
      });
    });
    this.recordService.selectedDay.subscribe(() => {
      if (this.records.length === 0) {
        return;
      }
      this.records.forEach((record) => {
        record.isFinished = this.serviceService.isRecordFinalised(record.id);
      });
    });
    this.recordService.apiStatus.subscribe((status) => {
      if (status === API_STATUS.SUCCESSFUL) {
        this.pageView = this.RECORD_PAGE_VIEWS.CALENDAR_VIEW;
        this.recordService.setNullRecord();
      }
    });
    this.serviceService.apiStatus.subscribe((status) => {
      if (status === API_STATUS.SUCCESSFUL) {
        this.pageView = this.RECORD_PAGE_VIEWS.CALENDAR_VIEW;
        this.recordService.setNullRecord();
      }
    });
  }

  onDateChanged(date: Date) {
    this.selectedDate = date;
    this.recordService.setDate(date);
  }

  onBackClick(): void {
    this.recordService.setNullRecord();
    this.pageView = this.RECORD_PAGE_VIEWS.CALENDAR_VIEW;
  }

  onAddRecordClick(): void {
    this.pageView = this.RECORD_PAGE_VIEWS.ADD_RECORD_VIEW;
  }

  onEditRecordClick(id: string): void {
    this.recordService.setSelectedRecord(id);
    this.pageView = this.RECORD_PAGE_VIEWS.EDIT_RECORD_VIEW;
  }

  onCheckoutRecordClick() {
    this.pageView = this.RECORD_PAGE_VIEWS.CHECKOUT_VIEW;
  }

  onCheckoutRecordBackClick() {
    this.pageView = this.RECORD_PAGE_VIEWS.EDIT_RECORD_VIEW;
  }
}
