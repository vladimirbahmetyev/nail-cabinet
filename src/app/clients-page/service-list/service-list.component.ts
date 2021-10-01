import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {service} from "../mockFile";

@Component({
  selector: 'app-service-page',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.sass']
})
export class ServiceListComponent implements OnInit {

  @Input() services : service[] | undefined
  @Output() onBack = new EventEmitter()
  @Output() onAdd = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onBackClick(): void {
    this.onBack.emit()
  }

  onAddClick(): void {
    this.onAdd.emit()
  }

}
