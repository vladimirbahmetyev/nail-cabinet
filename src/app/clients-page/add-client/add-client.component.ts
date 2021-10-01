import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.sass']
})
export class AddClientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() onBack = new EventEmitter()

  name = ''
  phoneNumber = ''
  instagram = ''

  onBackClick(): void {
    this.onBack.emit()
  }

  onSaveClick(): void {
    const result = { name: this.name, phone: this.phoneNumber, instagram: this.instagram };
    console.log(JSON.stringify(result))
  }

}
