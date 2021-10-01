import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {clientMock} from "../mockFile";

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.sass']
})
export class ClientInfoComponent implements OnInit {

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
