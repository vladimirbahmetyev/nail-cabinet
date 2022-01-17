import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getWorksTime } from '../../utils/helpers';
import { service, ServicesService } from '../../shared/servicesService/services.service';
import { v4 } from 'uuid';
import { RecordService } from '../../shared/recordService/record.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

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
      photo: [[], [this.photoValidator()]],
    });
  }

  onCreateService() {
    const id = v4();
    const recordId = this.recordService.selectedRecord.getValue()?.id || '';
    const photos = this.serviceForm.value.photo;
    const photosId = photos.map(() => v4())
    const service: service = {
      id: id,
      price: this.serviceForm.value.price,
      time: this.serviceForm.value.workTime,
      recordId: recordId,
      photosId: photosId,
    };
    this.serviceService.createService(service, photos);
  }

  onFileSelected(event: any) {
    const photos = event.target.files;
    const photosList: File[] = Object.values(photos);
    photosList.reverse();
    const photoInUrl = photosList.map((photo) => {
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      const result = { url: '', type: photo.type };
      reader.onload = () => {
        result.url = reader.result as string;
      };
      return result;
    });

    if (photoInUrl.length !== 0) {
      const oldPhoto = this.serviceForm.value.photo;
      this.serviceForm.setValue({
        ...this.serviceForm.value,
        photo: [...oldPhoto, ...photoInUrl],
      });
    }
  }

  photoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files: File[] = control.value;
      if (files.length === 0) {
        return null;
      }
      const isAllImg = files.every((file) => file.type.split('/')[0] === 'image');
      if (isAllImg) {
        return null;
      }
      return { type: 'Можно загружать только фотографии' };
    };
  }

  onDeleteClick(deleteIndex: number) {
    const afterDeletePhoto = this.serviceForm.value.photo.filter(
      (_: any, index: number) => deleteIndex !== index,
    );
    this.serviceForm.setValue({
      ...this.serviceForm.value,
      photo: afterDeletePhoto,
    });
  }

  onBackClick() {
    this.onBack.emit();
  }
}
