import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SERVICES } from '../../shared/constants';
import { getSelectedServiceOptions, getWorksTime } from '../../utils/helpers';
import {
  nullableSelectedService,
  nullableService, selectedService,
  service,
  ServicesService,
} from '../../shared/servicesService/services.service';
import {
  API_STATUS,
  nullableRecord,
  record,
  RecordService,
} from '../../shared/recordService/record.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.sass'],
})
export class EditServiceComponent implements OnInit {
  @Output() onBack = new EventEmitter();
  serviceTypes = SERVICES;
  selectedService: nullableSelectedService = null;
  selectedRecord: nullableRecord = null;
  serviceForm: FormGroup;
  workTimeStep = getWorksTime();

  constructor(
    private recordService: RecordService,
    private serviceService: ServicesService,
    private fb: FormBuilder,
  ) {
    this.serviceForm = fb.group({
      selectedServicesOptions: [[], Validators.required],
      time: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      comment: '',
      photo: [[], [this.photoValidator()]],
    });
  }

  ngOnInit(): void {
    this.recordService.selectedRecord.subscribe((record) => {
      this.selectedRecord = record;
      if (record !== null) {
        this.serviceForm.setValue({
          ...this.serviceForm.value,
          selectedServicesOptions: getSelectedServiceOptions(record.serviceOptionIds),
          comment: record.comment,
        });
      }
    });
    this.serviceService.selectedService.subscribe((service) => {
      this.selectedService = service;
      if (service !== null) {
        this.serviceForm.setValue({
          ...this.serviceForm.value,
          price: service.price,
          time: service.time,
          photo: service.photos?.map(({url, id}) => ({ url: url, type: 'image/*', id: id })) || [],
        });
      }
    });
    this.serviceService.apiStatus.subscribe((status) => {
      if (status === API_STATUS.SUCCESSFUL) {
        this.serviceForm.reset();
      }
    });
  }

  onBackClick(): void {
    this.onBack.emit();
    this.serviceForm.reset();
  }

  onSaveClick(): void {
    const service: selectedService = {
      price: this.serviceForm.value.price,
      id: this.selectedService?.id || '',
      recordId: this.selectedService?.recordId || '',
      time: this.serviceForm.value.time,
      photos: this.serviceForm.value.photo?.map((photo: { type: string; url: string, id: string }) =>
        ({ url: photo.url, id: photo.id || null})),
    };
    const selectedServicesOptions: { text: string; id: string }[] =
      this.serviceForm.value.selectedServicesOptions;
    const record: record = {
      comment: this.serviceForm.value.comment,
      serviceOptionIds: selectedServicesOptions.map((service) => service.id),
      id: this.selectedRecord?.id || '',
      clientId: this.selectedRecord?.clientId || '',
      date: this.selectedRecord?.date || new Date().toDateString(),
    };
    this.serviceService.updateService(service);
    this.recordService.editRecord(record);
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
        photo: [...photoInUrl, ...oldPhoto],
      });
    }
  }

  photoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files: File[] = control.value;
      if (!files || files.length === 0) {
        return null;
      }
      const isAllImg = files.every((file) => file.type.split('/')[0] === 'image');
      if (isAllImg) {
        return null;
      }
      return { type: 'Можно загружать только фотографии' };
    };
  }
}
