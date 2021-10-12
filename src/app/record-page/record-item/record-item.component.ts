import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SERVICES} from "../../shared/constants";
import {getRecordsTime} from "../../utils/helpers";
import {client, ClientsService} from "../../shared/clientsService/clients.service";
import {nullableRecord, record, RecordService} from "../../shared/recordService/record.service";
import {v4} from "uuid";

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.sass']
})
export class RecordItemComponent implements OnInit {

  @Input() isEdit : boolean | undefined
  @Input() selectedDate : Date | undefined
  @Output() onBack = new EventEmitter()

  constructor(private clientService: ClientsService, private recordService: RecordService) { }

  serviceOptions = SERVICES

  clients: client[] = []

  selectedRecord: nullableRecord = null
  selectedTime: string = ''
  selectedServices: {id: string, text: string}[] = []
  selectedClientId: string = ''
  comment = ''

  timesStep = getRecordsTime()

  prepareEditData(){
    const serviceId = this.selectedServices.map(service => service.id)
    const date = this.selectedDate ?  this.selectedDate : new Date()
    const [hours, minutes] = this.selectedTime.split(':')
    date.setHours(+hours)
    date.setMinutes(+minutes)
    const id = v4()
    const record: record = {
      id: this.selectedRecord?.id || id,
      name: serviceId,
      clientId: this.selectedClientId,
      comment: this.comment,
      date: date.toString()
    }
    return record
  }

  onChangeRecord(){
    const record = this.prepareEditData()
    if(this.isEdit) {
      this.recordService.editRecord(record)
    }
    else {
      this.recordService.createRecord(record)
    }
  }

  ngOnInit(): void {
    this.prepareEditData.bind(this)
    this.clientService.clients.subscribe(value => {
      this.clients = value
    })
    this.recordService.selectedRecord.subscribe(record => {
      this.selectedRecord = record
      if(record !== null) {
        this.selectedClientId = record?.clientId || ''
        const date = new Date(record.date)
        const stringDate = `${date.getHours()}:${date.getMinutes()}`
        this.selectedTime = stringDate.length === 5 ? stringDate : stringDate + '0'
        this.selectedServices = SERVICES.filter(service => record.name.some(serviceId => String(serviceId) === service.id))
      }
    })
  }

  onBackClick(): void {
    this.onBack.emit()
  }


}
