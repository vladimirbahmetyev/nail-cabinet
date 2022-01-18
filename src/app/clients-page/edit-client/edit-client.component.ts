import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientsService } from '../../shared/clientsService/clients.service';
import { ServicesService } from '../../shared/servicesService/services.service';
import { RecordService } from '../../shared/recordService/record.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-info',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.sass'],
})
export class EditClientComponent implements OnInit {
  @Output() onBack = new EventEmitter();
  @Output() onService = new EventEmitter();
  @Output() onRecord = new EventEmitter();
  hasServices = false;
  prevDate: Date | string = 'еще не был(а)';
  lastRecord: Date | string = '';
  editUserForm: FormGroup;

  constructor(
    private clientService: ClientsService,
    private serviceService: ServicesService,
    private recordService: RecordService,
    private fb: FormBuilder,
  ) {
    this.editUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      instagram: '',
      phoneNumber: '',
    });
  }

  ngOnInit(): void {
    this.editUserForm.valueChanges.subscribe(() => {
      const instField = this.editUserForm.get('instagram');
      const phoneField = this.editUserForm.get('phoneNumber');
      const checkContacts = this.emptyContactsValidator();
      if (checkContacts !== null) {
        instField?.setErrors({});
        phoneField?.setErrors({});
        this.editUserForm.setErrors(checkContacts);
        return;
      }
      if (!phoneField?.hasError('pattern')) {
        phoneField?.setErrors(null);
      }
      instField?.setErrors(null);
    });
    this.clientService.selectedClient.subscribe((client) => {
      if (client !== null) {
        this.editUserForm.setValue({
          name: client.name,
          phoneNumber: client.phone,
          instagram: client.instagram,
        });
        this.hasServices = this.serviceService.getServicesById(client.id).length > 0;
        const lastService = this.serviceService.getLastService(client.id);
        if (lastService !== null) {
          const prevRecord = this.recordService.getRecordById(lastService.recordId);
          if (prevRecord !== null) {
            this.prevDate = new Date(prevRecord.date);
          }
        }
        const lastRecord = this.recordService.getLastRecord(client.id);
        if (lastRecord !== null) {
          this.lastRecord = new Date(lastRecord.date);
        }
      }
    });
    this.recordService.records.subscribe(() => {
      const currentClient = this.clientService.selectedClient.getValue();
      if (currentClient === null) {
        return;
      }
      const lastRecord = this.recordService.getLastRecord(currentClient.id);
      if (lastRecord !== null) {
        const lastRecordDate = new Date(lastRecord.date);
        if (lastRecordDate > new Date()) {
          this.lastRecord = lastRecordDate;
        }
      }
    });
  }

  private emptyContactsValidator() {
    const { instagram, phoneNumber } = this.editUserForm.value;
    if (!instagram.trim().length && !phoneNumber.trim().length) {
      return { invalidContacts: 'Instagram и номер телефона не могут быть одновременно пусты' };
    }
    return null;
  }

  onSaveClick() {
    const selectedClient = this.clientService.selectedClient.getValue();
    if (selectedClient !== null) {
      this.clientService.editClient({
        name: this.editUserForm.value.name,
        instagram: this.editUserForm.value.instagram,
        phone: this.editUserForm.value.phoneNumber,
        id: selectedClient.id,
        services: selectedClient.services || [],
      });
    }
    this.setInitialValue();
  }

  onBackClick(): void {
    this.onBack.emit();
    this.clientService.setNullClient();
    this.setInitialValue();
  }

  onRecordClick() {
    this.onRecord.emit();
  }

  onServiceClick(): void {
    this.onService.emit();
  }

  setInitialValue() {
    this.hasServices = false;
    this.prevDate = '';
    this.lastRecord = '';
  }
}
