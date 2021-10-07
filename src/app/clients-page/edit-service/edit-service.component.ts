import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SERVICES} from "../../shared/constants";
import {getWorksTime} from "../../utils/helpers";
import {ClientsService, service} from "../../shared/clientsService/clients.service";

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

  constructor(private clientService: ClientsService) { }

  ngOnInit(): void {
    this.clientService.selectedService.subscribe(service => {
      if(service !== null){
        this.name = service.name
        this.price = service.price
        this.comment = service.comment
        this.time = service.time
      }
    })
  }

  name : string | undefined = ''
  price : number | undefined = 0
  comment : string | undefined= ''
  time : number | undefined =  0

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
