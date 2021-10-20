import { Component, OnInit } from '@angular/core';
import { API_STATUS, client, ClientsService } from '../shared/clientsService/clients.service';
import { ServicesService } from '../shared/servicesService/services.service';
import { RecordService } from '../shared/recordService/record.service';

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

  constructor(
    private clientService: ClientsService,
    private serviceService: ServicesService,
    private recordService: RecordService,
  ) {}

  ngOnInit() {
    this.clientService.clients.subscribe((clients) => {
      this.clients = clients;
    });
    this.clientService.apiStatus.subscribe((status) => {
      if (status === API_STATUS.SUCCESSFUL) {
        if (this.pageView === this.CLIENT_PAGE_VIEWS.CLIENT_ADD) {
          this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_LIST;
        }
        if (this.pageView === this.CLIENT_PAGE_VIEWS.CLIENT_INFO) {
          this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_LIST;
        }
      }
    });
    this.recordService.apiStatus.subscribe((status) => {
      if (
        status === API_STATUS.SUCCESSFUL &&
        this.pageView === this.CLIENT_PAGE_VIEWS.CLIENT_RECORD_ADD
      ) {
        this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_INFO;
      }
    });
    this.serviceService.apiStatus.subscribe((status) => {
      if (status === API_STATUS.SUCCESSFUL) {
        this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_SERVICE;
      }
    });
  }

  setClientViewId(id: string) {
    this.clientService.setSelectedClient(id);
    this.pageView = this.CLIENT_PAGE_VIEWS.CLIENT_INFO;
  }

  setClientViewBack() {
    this.serviceService.setNullSelectedService();
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
