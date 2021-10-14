import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SERVICES } from '../../shared/constants';
import { getSelectedServiceOptions, getWorksTime } from '../../utils/helpers';
import {
  nullableService,
  service,
  ServicesService,
} from '../../shared/servicesService/services.service';
import { nullableRecord, record, RecordService } from '../../shared/recordService/record.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.sass'],
})
export class EditServiceComponent implements OnInit {
  @Output() onBack = new EventEmitter();

  serviceTypes = SERVICES;
  workTimeStep = getWorksTime();
  selectedService: nullableService = null;
  selectedRecord: nullableRecord = null;

  selectedServicesOptions: any[] = [];

  constructor(private recordService: RecordService, private serviceService: ServicesService) {}

  ngOnInit(): void {
    this.recordService.selectedRecord.subscribe((record) => {
      this.selectedRecord = record;
      if (record !== null) {
        this.selectedServicesOptions = getSelectedServiceOptions(record.serviceOptionIds);
      }
    });
    this.serviceService.selectedService.subscribe((value) => {
      this.selectedService = value;
      if (value !== null) {
        this.price = value.price;
        this.time = value.time;
      }
    });
  }

  name: string = '';
  price: number = 0;
  comment: string = '';
  time: string = '10:00';

  onBackClick(): void {
    this.onBack.emit();
  }

  onSaveClick(): void {
    const service: service = {
      price: this.price,
      id: this.selectedService?.id || '',
      recordId: this.selectedService?.recordId || '',
      time: this.time,
    };
    const record: record = {
      comment: this.comment,
      serviceOptionIds: this.selectedServicesOptions.map((service) => service.id),
      id: this.selectedRecord?.id || '',
      clientId: this.selectedRecord?.clientId || '',
      date: this.selectedRecord?.date || new Date().toDateString(),
    };
    this.serviceService.updateService(service);
    this.recordService.editRecord(record);
  }
}
