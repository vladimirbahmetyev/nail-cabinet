import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {service} from "../clients-page/mockFile";

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.sass']
})
export class ServicePageComponent implements OnInit {

  @Input() services : service[] | undefined
  @Output() onBack = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onBackClick(): void {
    this.onBack.emit()
  }

}
