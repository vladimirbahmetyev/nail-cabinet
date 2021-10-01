import { Component, OnInit } from '@angular/core';
import {clientMock, clientsMock, serviceMock} from "./mockFile";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru'

registerLocaleData(localeRu, 'ru')

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.sass']
})

export class ClientsPageComponent implements OnInit {

  CLIENT_PAGE_VIEWS = { CLIENT_LIST: "clientList", CLIENT_ADD: "addClient", CLIENT_INFO: "clientInfo", CLIENT_SERVICE:'clientService' };
  clientView = this.CLIENT_PAGE_VIEWS.CLIENT_LIST
  searchString = ''

  selectedClient: clientMock = null

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

  clientMock = clientsMock
  ngOnInit(): void {
  }
}


