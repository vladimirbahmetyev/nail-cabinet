import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.sass']
})
export class RecordItemComponent implements OnInit {

  @Input() isEdit : boolean | undefined
  @Output() onBack = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onBackClick(): void {
    this.onBack.emit()
  }


}
