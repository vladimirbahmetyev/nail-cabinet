import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {getWorksTime} from "../../utils/helpers";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  @Output() onBack = new EventEmitter()

  price = 0
  workTime = '1:00'
  workTimeSteps = getWorksTime()

  constructor() { }

  ngOnInit(): void {
  }

  onBackClick(){
    this.onBack.emit()
  }
}
