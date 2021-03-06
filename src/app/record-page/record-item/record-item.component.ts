import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SERVICES } from '../../shared/constants';
import { getRecordsTime, getSelectedServiceOptions } from '../../utils/helpers';
import { client, ClientsService } from '../../shared/clientsService/clients.service';
import { nullableRecord, record, RecordService } from '../../shared/recordService/record.service';
import { v4 } from 'uuid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../shared/servicesService/services.service';

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.sass'],
})
export class RecordItemComponent implements OnInit {
  serviceOptions = SERVICES;
  @Input() isEdit: boolean | undefined;
  @Output() onBack = new EventEmitter();
  @Output() onCheckout = new EventEmitter();
  clients: client[] = [];
  selectedRecord: nullableRecord = null;
  timesStep = getRecordsTime();
  recordForm: FormGroup;
  isFinalise = false;
  clientSearchString = '';

  constructor(
    private clientService: ClientsService,
    private recordService: RecordService,
    private fb: FormBuilder,
    private serviceService: ServicesService,
  ) {
    this.recordForm = this.fb.group({
      selectedClientId: [null, [Validators.required]],
      selectedClientName: [null, [Validators.required]],
      time: ['', [Validators.required]],
      comment: '',
      selectedServices: [[], [Validators.required]],
    });
  }

  ngOnInit() {
    this.clientService.clients.subscribe((value) => {
      this.clients = value;
    });
    this.recordService.selectedRecord.subscribe((record) => {
      this.selectedRecord = record;
      if (record !== null) {
        const clientName = this.clients.find((client) => client.id === record.clientId)?.name;
        const date = new Date(record.date);
        const stringDate = `${date.getHours()}:${date.getMinutes()}`;
        this.recordForm.setValue({
          selectedServices: getSelectedServiceOptions(record.serviceOptionIds),
          comment: record.comment,
          time: stringDate.length === 5 ? stringDate : stringDate + '0',
          selectedClientId: record?.clientId,
          selectedClientName: clientName,
        });
        this.isFinalise = this.serviceService.isRecordFinalised(record.id);
      } else {
        this.recordForm.reset();
      }
    });
  }

  prepareEditData() {
    const selectedServices: { text: string; id: string }[] = this.recordForm.value.selectedServices;
    const serviceId = selectedServices.map((service) => service.id);
    const selectedDate = this.recordService.selectedDay.value;
    const date = selectedDate ? selectedDate : new Date();
    const [hours, minutes] = this.recordForm.value.time.split(':');
    date.setHours(+hours);
    date.setMinutes(+minutes);
    const id = v4();
    const record: record = {
      id: this.selectedRecord?.id || id,
      serviceOptionIds: serviceId,
      clientId: this.recordForm.value.selectedClientId,
      comment: this.recordForm.value.comment || '',
      date: date.toString(),
    };
    return record;
  }

  onSaveRecord() {
    const record = this.prepareEditData();
    if (this.isEdit) {
      this.recordService.editRecord(record);
      this.recordForm.reset();
    } else {
      this.recordService.createRecord(record);
      this.recordForm.reset();
    }
  }

  onCheckoutClick() {
    this.onCheckout.emit();
  }

  onBackClick(): void {
    this.onBack.emit();
    this.recordForm.reset();
  }

  onSelectClient(clientId: string) {
    this.recordForm.setValue({
      ...this.recordForm.value,
      selectedClientId: clientId,
      selectedClientName: this.clients.find((client) => client.id === clientId)?.name,
    });
  }
}
