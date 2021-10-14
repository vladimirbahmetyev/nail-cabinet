import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SERVICES } from '../../shared/constants';
import { getRecordsTime, getWorksTime } from '../../utils/helpers';
import { record, RecordService } from '../../shared/recordService/record.service';
import { v4 } from 'uuid';
import { ClientsService } from '../../shared/clientsService/clients.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.sass'],
})
export class AddServiceComponent implements OnInit {
  @Output() onBack = new EventEmitter();
  name = [];
  date: Date = new Date();
  time = '';
  comment = '';
  serviceTypes = SERVICES;
  selectedServices: { text: string; id: string }[] = [];
  constructor(private recordService: RecordService, private clientService: ClientsService) {}

  timeStep = getRecordsTime();

  ngOnInit(): void {}

  onBackClick(): void {
    this.onBack.emit();
  }

  onSaveClick(): void {
    const date = this.date;
    const [hours, minutes] = this.time.split(':');
    date.setHours(+hours);
    date.setMinutes(+minutes);
    const id = v4();
    const clientId = this.clientService.selectedClient.getValue()?.id || '';
    const result: record = {
      name: this.selectedServices.map((service) => service.id),
      date: this.date.toString(),
      comment: this.comment,
      clientId: clientId,
      id: id,
    };
    this.recordService.createRecord(result);
  }
}
