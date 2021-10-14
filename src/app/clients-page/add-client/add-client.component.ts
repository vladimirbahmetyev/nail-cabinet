import { Component, EventEmitter, Output } from '@angular/core';
import { ClientsService } from '../../shared/clientsService/clients.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.sass'],
})
export class AddClientComponent {
  @Output() onBack = new EventEmitter();
  name = '';
  phoneNumber = '';
  instagram = '';

  constructor(private clientService: ClientsService) {}

  onBackClick() {
    this.onBack.emit();
  }

  onCreateClientClick() {
    const clientId = uuidv4();
    const newClient = {
      name: this.name,
      phone: this.phoneNumber,
      instagram: this.instagram,
      id: clientId,
      services: [],
    };
    this.clientService.createClient(newClient);
  }
}
