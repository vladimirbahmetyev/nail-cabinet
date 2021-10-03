import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.sass']
})
export class TopComponent implements OnInit {

  @Input() title: string | undefined
  @Output() onBack = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onBackClick() :void {
    this.onBack.emit()
  }
}
