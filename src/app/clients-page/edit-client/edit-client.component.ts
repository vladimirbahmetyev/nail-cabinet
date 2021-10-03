import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {clientMock} from "../mockFile";

@Component({
  selector: 'app-client-info',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.sass']
})
export class EditClientComponent implements OnInit {

  @Input() client : clientMock | undefined
  @Output() onBack = new EventEmitter()
  @Output() onService = new EventEmitter()

  constructor() { }

  name : string | null = null
  instagram : string | null = null
  phone : string | null = null


  ngOnInit(): void {
    if(this.client !== undefined){
      this.name = this.client?.name || null
      this.instagram = this.client?.instagram || null
      this.phone = this.client?.phone || null
    }
  }

  onBackClick(): void {
    this.onBack.emit()
  }

  onServiceClick(): void {
    this.onService.emit()
  }

}
