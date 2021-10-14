import { Component, OnInit } from '@angular/core';
import { client, ClientsService } from '../shared/clientsService/clients.service';
import { ServicesService } from '../shared/servicesService/services.service';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.sass'],
})
export class ClientsPageComponent implements OnInit {
  CLIENT_PAGE_VIEWS = {
    CLIENT_LIST: 'clientList',
    CLIENT_ADD: 'clientAdd',
    CLIENT_INFO: 'clientInfo',
    CLIENT_SERVICE: 'clientService',
    CLIENT_RECORD_ADD: 'clientRecordAdd',
    CLIENT_SERVICE_EDIT: 'clientServiceEdit',
  };

  pageView = this.CLIENT_PAGE_VIEWS.CLIENT_LIST;
  searchString = '';
  clients: client[] = [];

  constructor(private clientService: ClientsService, private serviceService: ServicesService) {}

  ngOnInit() {
    this.clientService.clients.subscribe((clients) => {
      this.clients = clients;
    });
  }

  setClientViewId(id: string) {
    this.clientService.setSelectedClient(id);
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_INFO;
  }

  setClientViewBack() {
    this.serviceService.setNullService();
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_INFO;
  }

  setAddClientView() {
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_ADD;
  }

  setClientListView() {
    this.clientService.setNullClient();
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_LIST;
  }

  setServiceListView() {
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_SERVICE;
  }

  setCreateRecordView() {
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_RECORD_ADD;
  }

  setEditServiceView() {
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_SERVICE_EDIT;
  }
}
