import {Component, EventEmitter, OnInit, Output} from '@angular/core';

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

  constructor() { }

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
