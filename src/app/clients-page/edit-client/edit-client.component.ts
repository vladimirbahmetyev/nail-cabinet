import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {client, ClientsService} from "../../shared/clientsService/clients.service";

@Component({
  selector: 'app-client-info',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.sass']
})
export class EditClientComponent implements OnInit {

  @Output() onBack = new EventEmitter()
  @Output() onService = new EventEmitter()

  constructor(private clientService : ClientsService) { }

  name : string | null = null
  instagram : string | null = null
  phone : string | null = null


  ngOnInit(): void {
    this.clientService.selectedClient.subscribe(client => {
      if(client !== null){
        this.name = client.name || null
        this.instagram = client.instagram || null
        this.phone = client.phone || null
      }
    })
  }

  onBackClick(): void {
    this.onBack.emit()
  }

  onServiceClick(): void {
    this.onService.emit()
  }

}
