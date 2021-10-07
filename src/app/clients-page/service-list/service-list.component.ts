import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientsService, service} from "../../shared/clientsService/clients.service";

@Component({
  selector: 'app-service-page',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.sass']
})
export class ServiceListComponent implements OnInit {

  services : service[] = []
  @Output() onBack = new EventEmitter()
  @Output() onAdd = new EventEmitter()
  @Output() onService = new EventEmitter()

  constructor(private clientService : ClientsService) { }

  ngOnInit(): void {
    this.clientService.selectedClient.subscribe(client => {
      this.services = client?.services || []
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
    this.clientService.setSelectedService(id);
  }
}
