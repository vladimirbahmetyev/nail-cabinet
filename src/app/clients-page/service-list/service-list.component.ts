import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientsService } from '../../shared/clientsService/clients.service';
import { service, ServicesService } from '../../shared/servicesService/services.service';
import { RecordService } from '../../shared/recordService/record.service';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.sass'],
})
export class ServiceListComponent implements OnInit {
  services: service[] = [];
  serviceDates: Date[] = [];
  @Output() onBack = new EventEmitter();
  @Output() onService = new EventEmitter();

  constructor(
    private clientService: ClientsService,
    private serviceService: ServicesService,
    private recordService: RecordService,
  ) {}

  ngOnInit(): void {
    this.clientService.selectedClient.subscribe((client) => {
      this.services = this.serviceService.getServicesById(client?.id);
      this.serviceDates = this.services
        .map((service) => {
          const recordDate = this.recordService.getRecordById(service.recordId)?.date;
          if (recordDate === undefined) {
            return new Date();
          }
          return new Date(recordDate);
        })
        .sort((a, b) => a.getTime() - b.getTime());
    });
  }

  onBackClick(): void {
    this.onBack.emit();
  }

  onServiceClick(id: string = '-1'): void {
    this.onService.emit();
    this.serviceService.setSelectedService(id);
    const recordId = this.services.find((service) => service.id === id)?.recordId || '';
    this.recordService.setSelectedRecord(recordId);
  }
}
