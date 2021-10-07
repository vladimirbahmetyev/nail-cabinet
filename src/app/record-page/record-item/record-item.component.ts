import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SERVICES} from "../../shared/constants";
import {getRecordsTime} from "../../utils/helpers";
import {client, ClientsService} from "../../shared/clientsService/clients.service";

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.sass']
})
export class RecordItemComponent implements OnInit {

  @Input() isEdit : boolean | undefined
  @Output() onBack = new EventEmitter()

  constructor(private clientService: ClientsService) { }

  serviceOptions = SERVICES

  clients: client[] = []

  timesStep = getRecordsTime()

  ngOnInit(): void {
    this.clients = this.clientService.clients
  }

  onBackClick(): void {
    this.onBack.emit()
  }


}
