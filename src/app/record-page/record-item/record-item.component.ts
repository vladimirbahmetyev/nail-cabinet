import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SERVICES} from "../../shared/constants";
import {getRecordsTime} from "../../utils/helpers";
import {client, ClientsService} from "../../shared/clientsService/clients.service";
import {nullableRecord, RecordService} from "../../shared/recordService/record.service";

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.sass']
})
export class RecordItemComponent implements OnInit {

  @Input() isEdit : boolean | undefined
  @Output() onBack = new EventEmitter()

  constructor(private clientService: ClientsService, private recordService: RecordService) { }

  serviceOptions = SERVICES

  clients: client[] = []

  selectedRecord: nullableRecord = null
  selectedTime: string = ''

  timesStep = getRecordsTime()

  ngOnInit(): void {

    this.clientService.clients.subscribe(value => {
      this.clients = value
    })
    this.recordService.selectedRecord.subscribe(record => {
      this.selectedRecord = record
      this.selectedTime = (14) .toString() + ':00' || ''
      console.log(this.selectedTime)
    })
  }

  onBackClick(): void {
    this.onBack.emit()
  }


}
