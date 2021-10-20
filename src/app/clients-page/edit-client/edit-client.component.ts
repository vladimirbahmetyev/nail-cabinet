import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientsService } from '../../shared/clientsService/clients.service';

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

  constructor(private clientService: ClientsService) {}

  ngOnInit(): void {
    this.clientService.selectedClient.subscribe((client) => {
      if (client !== null) {
        this.name = client.name;
        this.instagram = client.instagram;
        this.phone = client.phone;
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
  }

  onRecordClick() {
    this.onRecord.emit();
  }

  onServiceClick(): void {
    this.onService.emit();
  }
}
