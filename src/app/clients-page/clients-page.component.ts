import { Component, OnInit } from '@angular/core';
import {clientMock, clientsMock, service, serviceMock} from "./mockFile";
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
  clientView = this.CLIENT_PAGE_VIEWS.CLIENT_LIST
  searchString = ''

  selectedClient: clientMock = null
  selectedService: service = null

  constructor() {
  }

  setClientViewId(id: number) : void {
    this.selectedClient = this.clientMock.find(client => client?.id === id) || null
    if(this.selectedClient !== null) {
      this.clientView = this.CLIENT_PAGE_VIEWS.CLIENT_INFO;
    }
  }

  setClientView(): void {
    this.clientView = this.CLIENT_PAGE_VIEWS.CLIENT_INFO
  }

  setAddClientView() : void {
    this.clientView = this.CLIENT_PAGE_VIEWS.CLIENT_ADD;
  }

  setClientListView(): void {
    this.clientView = this.CLIENT_PAGE_VIEWS.CLIENT_LIST;
    this.selectedClient = null
  }

  setServiceListView():void {
    this.clientView = this.CLIENT_PAGE_VIEWS.CLIENT_SERVICE;
  }

  setAddServiceView(): void {
    this.clientView = this.CLIENT_PAGE_VIEWS.CLIENT_SERVICE_ADD
  }

  setEditServiceView(id: number): void {
    this.selectedService = this.selectedClient?.services.find(service => service?.id === id) || null
    if (this.selectedService !== null) {
      this.clientView = this.CLIENT_PAGE_VIEWS.CLIENT_SERVICE_EDIT
    }
  }


  clientMock = clientsMock
  ngOnInit(): void {
  }
}

