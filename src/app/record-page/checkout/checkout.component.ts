import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getWorksTime } from '../../utils/helpers';
import { service, ServicesService } from '../../shared/servicesService/services.service';
import { v4 } from 'uuid';
import { RecordService } from '../../shared/recordService/record.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass'],
})
export class CheckoutComponent {
  @Output() onBack = new EventEmitter();
  workTimeSteps = getWorksTime();
  serviceForm: FormGroup;
  constructor(
    private serviceService: ServicesService,
    private recordService: RecordService,
    private fb: FormBuilder,
  ) {
    this.serviceForm = this.fb.group({
      price: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      workTime: ['', [Validators.required]],
    });
  }

  onCreateService() {
    const id = v4();
    const recordId = this.recordService.selectedRecord.getValue()?.id || '';
    const service: service = {
      id: id,
      price: this.serviceForm.value.price,
      time: this.serviceForm.value.workTime,
      recordId: recordId,
    };
    this.serviceService.createService(service);
  }

  onBackClick() {
    this.onBack.emit();
  }
}
