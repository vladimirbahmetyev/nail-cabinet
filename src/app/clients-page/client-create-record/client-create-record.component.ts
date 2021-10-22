import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SERVICES } from '../../shared/constants';
import { getIdFromServices, getRecordsTime, getWorksTime } from '../../utils/helpers';
import { record, RecordService } from '../../shared/recordService/record.service';
import { v4 } from 'uuid';
import { ClientsService } from '../../shared/clientsService/clients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-service',
  templateUrl: './client-create-record.component.html',
  styleUrls: ['./client-create-record.component.sass'],
})
export class ClientCreateRecordComponent {
  @Output() onBack = new EventEmitter();
  serviceTypes = SERVICES;
  recordTimeStep = getRecordsTime();
  recordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recordService: RecordService,
    private clientService: ClientsService,
  ) {
    this.recordForm = this.fb.group({
      date: [null, [Validators.required]],
      time: ['', [Validators.required]],
      comment: '',
      selectedServices: [[], [Validators.required]],
    });
  }

  onBackClick() {
    this.onBack.emit();
  }

  onCreateRecordClick() {
    const client = this.clientService.selectedClient.getValue();
    if (client === null) {
      return;
    }
    const date = this.recordForm.value.date;
    const [hours, minutes] = this.recordForm.value.time.split(':');
    date.setHours(+hours);
    date.setMinutes(+minutes);
    const id = v4();
    const clientId = client.id;
    const serviceOptionIds = getIdFromServices(this.recordForm.value.selectedServices);

    const newRecord: record = {
      serviceOptionIds: serviceOptionIds,
      date: this.recordForm.value.date.toString(),
      comment: this.recordForm.value.comment,
      clientId: clientId,
      id: id,
    };
    this.recordService.createRecord(newRecord);
  }
}
