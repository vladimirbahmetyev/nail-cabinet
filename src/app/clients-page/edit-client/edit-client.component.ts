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

  ngOnInit(): void {
  }

  onBackClick(): void {
    this.onBack.emit()
  }

  onServiceClick(): void {
    this.onService.emit()
  }

}
