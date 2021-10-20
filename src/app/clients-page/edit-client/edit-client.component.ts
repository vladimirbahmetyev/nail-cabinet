import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientsService } from '../../shared/clientsService/clients.service';
import { ServicesService } from '../../shared/servicesService/services.service';
import { RecordService } from '../../shared/recordService/record.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.sass'],
})
export class EditClientComponent implements OnInit {
  @Output() onBack = new EventEmitter();
  @Output() onService = new EventEmitter();
  @Output() onRecord = new EventEmitter();
  name = '';
  instagram = '';
  phone = '';
  hasServices = false;
  prevDate: Date | string = 'еще не был(а)';

  constructor(
    private clientService: ClientsService,
    private serviceService: ServicesService,
    private recordService: RecordService,
  ) {}

  ngOnInit(): void {
    this.setInitialValue.bind(this);
    this.clientService.selectedClient.subscribe((client) => {
      if (client !== null) {
        this.name = client.name;
        this.instagram = client.instagram;
        this.phone = client.phone;
        this.hasServices = this.serviceService.getServicesById(client.id).length > 0;
        const lastService = this.serviceService.getLastService(client.id);
        if (lastService !== null) {
          const prevRecord = this.recordService.getRecordById(lastService.recordId);
          if (prevRecord !== null) {
            this.prevDate = new Date(prevRecord.date);
          }
        }
      }
    });
  }

  onSaveClick() {
    const selectedClient = this.clientService.selectedClient.getValue();
    if (selectedClient !== null) {
      this.clientService.editClient({
        name: this.name,
        instagram: this.instagram,
        phone: this.phone,
        id: selectedClient.id,
        services: selectedClient.services || [],
      });
    }
  }

  onBackClick(): void {
    this.onBack.emit();
    this.clientService.setNullClient();
    this.setInitialValue();
  }

  onRecordClick() {
    this.onRecord.emit();
  }

  onServiceClick(): void {
    this.onService.emit();
  }

  setInitialValue() {
    this.name = '';
    this.instagram = '';
    this.phone = '';
    this.hasServices = false;
    this.prevDate = 'еще не был(а)';
  }
}
