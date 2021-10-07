import { Component, OnInit } from '@angular/core';
import {client, ClientsService, service} from "../shared/clientsService/clients.service";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru'

registerLocaleData(localeRu, 'ru')

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.sass']
})

export class ClientsPageComponent implements OnInit {

  CLIENT_PAGE_VIEWS = {
    CLIENT_LIST: "clientList",
    CLIENT_ADD: "addClient",
    CLIENT_INFO: "clientInfo",
    CLIENT_SERVICE:'clientService',
    CLIENT_SERVICE_ADD: 'addClientService',
    CLIENT_SERVICE_EDIT: 'editClientService',
  };
  pageView = this.CLIENT_PAGE_VIEWS.CLIENT_LIST

  searchString = ''
  clients: client[] = []

  constructor(private clientService : ClientsService) {
  }

  ngOnInit(): void {
    this.clients = this.clientService.clients
  }

  setClientViewId(id: string) : void {
    this.clientService.setSelectedClient(id)
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_INFO;
  }

  setClientView(): void {
    this.clientService.setSelectedService(null)
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_INFO
  }

  setAddClientView() : void {
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_ADD;
  }

  setClientListView(): void {
    this.clientService.setSelectedClient(null)
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_LIST;
  }

  setServiceListView():void {
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_SERVICE;
  }

  setAddServiceView(): void {
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_SERVICE_ADD
  }

  setEditServiceView(): void {
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_SERVICE_EDIT
  }
}


