import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientsService} from "../../shared/clientsService/clients.service";
import {service, ServicesService} from "../../shared/servicesService/services.service";
import {record, RecordService} from "../../shared/recordService/record.service";
import {getNameServicesFromId} from "../../utils/helpers";

@Component({
  selector: 'app-service-page',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.sass']
})
export class ServiceListComponent implements OnInit {

  services : record[] = []
  @Output() onBack = new EventEmitter()
  @Output() onAdd = new EventEmitter()
  @Output() onService = new EventEmitter()

  constructor(private clientService : ClientsService, private recordService: RecordService) { }

  ngOnInit(): void {
    this.clientService.selectedClient.subscribe(client => {
      this.services = this.recordService.records.getValue().filter(record => record.clientId === client?.id)
    })
  }

  onBackClick(): void {
    this.onBack.emit()
  }

  onAddClick(): void {
    this.onAdd.emit()
  }

  onServiceClick(id: string = '-1') : void {
    this.onService.emit()
    this.recordService.setSelectedRecord(id);
  }
}
