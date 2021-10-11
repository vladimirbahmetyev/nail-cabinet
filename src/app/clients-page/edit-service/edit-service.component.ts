import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SERVICES} from "../../shared/constants";
import {getWorksTime} from "../../utils/helpers";
import {ClientsService} from "../../shared/clientsService/clients.service";
import {service, ServicesService} from "../../shared/servicesService/services.service";

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.sass']
})
export class EditServiceComponent implements OnInit {

  @Output() onBack = new EventEmitter()

  serviceTypes = SERVICES
  workTimeStep = getWorksTime()

  newServices: String[] = []

  constructor(private serviceService: ServicesService) { }

  ngOnInit(): void {
    this.serviceService.selectedService.subscribe(service => {
      if(service !== null){
        this.name = service.name
        this.price = service.price
        this.comment = service.comment
        this.time = service.time
      }
    })
  }

  name : string  = ''
  price : number  = 0
  comment : string = ''
  time : number  =  0

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
