import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {service} from "../mockFile";
import {SERVICES} from "../../shared/constants";
import {getWorksTime} from "../../record-page/recordMock";

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.sass']
})
export class EditServiceComponent implements OnInit {

  @Input() selectedService : service | undefined
  @Output() onBack = new EventEmitter()

  serviceTypes = SERVICES
  workTimeStep = getWorksTime()

  newServices: String[] = []

  constructor() { }

  name : string | undefined = ''
  price : number | undefined = 0
  comment : string | undefined= ''
  time : number | undefined =  0


  ngOnInit(): void {
    this.name = this.selectedService?.name
    this.price = this.selectedService?.price
    this.comment = this.selectedService?.comment
    this.time = this.selectedService?.time
  }

  onBackClick() : void {
    this.onBack.emit()
  }

  onSaveClick() : void {
    console.log()
  }

  onSelectChange() {
    console.log(this.newServices)
  }

}
