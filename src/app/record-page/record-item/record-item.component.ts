import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SERVICES} from "../../shared/constants";
import {clientsMock} from "../../clients-page/mockFile";
import {getRecordsTime} from "../recordMock";

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.sass']
})
export class RecordItemComponent implements OnInit {

  @Input() isEdit : boolean | undefined
  @Output() onBack = new EventEmitter()

  serviceOptions = SERVICES
  clients = clientsMock

  timesStep = getRecordsTime()

  constructor() { }

  ngOnInit(): void {
  }

  onBackClick(): void {
    this.onBack.emit()
  }


}
