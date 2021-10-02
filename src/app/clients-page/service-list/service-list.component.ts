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
  @Output() onService = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  onBackClick(): void {
    this.onBack.emit()
  }

  onAddClick(): void {
    this.onAdd.emit()
  }

  onServiceClick(id: number = -1) : void {
    this.onService.emit(id)
  }
}
