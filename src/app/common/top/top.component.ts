import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.sass'],
})
export class TopComponent {
  @Input() title: string | undefined;
  @Output() onBack = new EventEmitter();

  onBackClick(): void {
    this.onBack.emit();
  }
}
