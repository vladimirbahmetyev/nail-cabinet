import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SERVICES } from '../../shared/constants';
import { getIdFromServices, getRecordsTime, getWorksTime } from '../../utils/helpers';
import { record, RecordService } from '../../shared/recordService/record.service';
import { v4 } from 'uuid';
import { ClientsService } from '../../shared/clientsService/clients.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './client-create-record.component.html',
  styleUrls: ['./client-create-record.component.sass'],
})
export class ClientCreateRecordComponent {
  @Output() onBack = new EventEmitter();
  date: Date = new Date();
  time = '';
  comment = '';
  serviceTypes = SERVICES;
  recordTimeStep = getRecordsTime();
  selectedServices: { text: string; id: string }[] = [];

  constructor(private recordService: RecordService, private clientService: ClientsService) {}

  onBackClick() {
    this.onBack.emit();
  }

  onCreateRecordClick() {
    const client = this.clientService.selectedClient.getValue();
    if (client === null) {
      return;
    }
    const date = this.date;
    const [hours, minutes] = this.time.split(':');
    date.setHours(+hours);
    date.setMinutes(+minutes);
    const id = v4();
    const clientId = client.id;
    const serviceOptionIds = getIdFromServices(this.selectedServices);

    const newRecord: record = {
      serviceOptionIds: serviceOptionIds,
      date: this.date.toString(),
      comment: this.comment,
      clientId: clientId,
      id: id,
    };
    this.recordService.createRecord(newRecord);
  }
}
