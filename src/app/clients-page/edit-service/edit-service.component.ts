import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SERVICES } from '../../shared/constants';
import { getSelectedServiceOptions, getWorksTime } from '../../utils/helpers';
import {
  nullableService,
  service,
  ServicesService,
} from '../../shared/servicesService/services.service';
import { nullableRecord, record, RecordService } from '../../shared/recordService/record.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.sass'],
})
export class EditServiceComponent implements OnInit {
  @Output() onBack = new EventEmitter();
  serviceTypes = SERVICES;
  selectedService: nullableService = null;
  selectedRecord: nullableRecord = null;
  serviceForm: FormGroup;
  workTimeStep = getWorksTime();

  constructor(
    private recordService: RecordService,
    private serviceService: ServicesService,
    private fb: FormBuilder,
  ) {
    this.serviceForm = fb.group({
      selectedServicesOptions: [[], Validators.required],
      time: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      comment: '',
      photo: [],
    });
  }

  ngOnInit(): void {
    this.recordService.selectedRecord.subscribe((record) => {
      this.selectedRecord = record;
      if (record !== null) {
        this.serviceForm.setValue({
          ...this.serviceForm.value,
          selectedServicesOptions: getSelectedServiceOptions(record.serviceOptionIds),
          comment: record.comment,
        });
      }
    });
    this.serviceService.selectedService.subscribe((service) => {
      this.selectedService = service;
      if (service !== null) {
        this.serviceForm.setValue({
          ...this.serviceForm.value,
          price: service.price,
          time: service.time,
          photo: service.photo || [],
        });
      }
    });
  }

  onBackClick(): void {
    this.onBack.emit();
    this.serviceForm.reset();
  }

  onSaveClick(): void {
    const service: service = {
      price: this.serviceForm.value.price,
      id: this.selectedService?.id || '',
      recordId: this.selectedService?.recordId || '',
      time: this.serviceForm.value.time,
      photo: this.serviceForm.value.photo,
    };
    const selectedServicesOptions: { text: string; id: string }[] =
      this.serviceForm.value.selectedServicesOptions;
    const record: record = {
      comment: this.serviceForm.value.comment,
      serviceOptionIds: selectedServicesOptions.map((service) => service.id),
      id: this.selectedRecord?.id || '',
      clientId: this.selectedRecord?.clientId || '',
      date: this.selectedRecord?.date || new Date().toDateString(),
    };
    this.serviceService.updateService(service);
    this.recordService.editRecord(record);
    this.serviceForm.reset();
  }
}
