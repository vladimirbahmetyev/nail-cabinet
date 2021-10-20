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
    CLIENT_LIST: 0,
    CLIENT_ADD: 1,
    CLIENT_INFO: 2,
    CLIENT_SERVICE: 3,
    CLIENT_RECORD_ADD: 4,
    CLIENT_SERVICE_EDIT: 5,
  };

  pageView: number = this.CLIENT_PAGE_VIEWS.CLIENT_LIST;
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
