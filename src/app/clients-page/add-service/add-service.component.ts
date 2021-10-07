import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SERVICES} from "../../shared/constants";
import {getWorksTime} from "../../utils/helpers";

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.sass']
})
export class AddServiceComponent implements OnInit {

  @Output() onBack = new EventEmitter()
  name = ''
  price = 0
  time = 0
  comment = ''
  serviceTypes = SERVICES
  selectedServices : { text: string, id: number }[] = []
  constructor() { }

  workTimeStep = getWorksTime()

  ngOnInit(): void {
  }

  onBackClick(): void {
    this.onBack.emit()
  }

  onSaveClick():void {
    const result = {
      name: this.name,
      price: this.price,
      time: this.time,
      comment: this.comment
    }
    console.log(JSON.stringify(result))
  }


}
