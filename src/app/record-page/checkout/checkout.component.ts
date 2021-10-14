import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getWorksTime } from '../../utils/helpers';
import { service, ServicesService } from '../../shared/servicesService/services.service';
import { v4 } from 'uuid';
import { RecordService } from '../../shared/recordService/record.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass'],
})
export class CheckoutComponent implements OnInit {
  @Output() onBack = new EventEmitter();

  price = 0;
  workTime = '1:00';
  workTimeSteps = getWorksTime();

  constructor(private serviceService: ServicesService, private recordService: RecordService) {}

  ngOnInit(): void {}

  onCreateService() {
    const id = v4();
    const recordId = this.recordService.selectedRecord.getValue()?.id || '';
    const service: service = {
      id: id,
      price: this.price,
      time: this.workTime,
      recordId: recordId,
    };
    this.serviceService.createService(service);
  }

  onBackClick() {
    this.onBack.emit();
  }
}
