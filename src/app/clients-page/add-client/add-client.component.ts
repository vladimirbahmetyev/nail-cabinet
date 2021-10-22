import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientsService } from '../../shared/clientsService/clients.service';
import { v4 as uuidv4 } from 'uuid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.sass'],
})
export class AddClientComponent implements OnInit {
  @Output() onBack = new EventEmitter();
  userForm: FormGroup;

  constructor(private clientService: ClientsService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      instagram: '',
      phoneNumber: ['', [Validators.pattern('\\+?\\d*')]],
    });
    this.emptyContactsValidator.bind(this);
  }

  ngOnInit() {
    this.userForm.valueChanges.subscribe(() => {
      const instField = this.userForm.get('instagram');
      const phoneField = this.userForm.get('phoneNumber');
      const checkContacts = this.emptyContactsValidator();
      if (checkContacts !== null) {
        instField?.setErrors({});
        phoneField?.setErrors({});
        this.userForm.setErrors(checkContacts);
        return;
      }
      if (!phoneField?.hasError('pattern')) {
        phoneField?.setErrors(null);
      }
      instField?.setErrors(null);
    });
  }

  private emptyContactsValidator() {
    const { instagram, phoneNumber } = this.userForm.value;
    if (!instagram.trim().length && !phoneNumber.trim().length) {
      return { invalidContacts: 'Instagram и номер телефона не могут быть одновременно пусты' };
    }
    return null;
  }

  onBackClick() {
    this.onBack.emit();
  }

  onCreateClientClick() {
    const clientId = uuidv4();
    const newClient = {
      name: this.userForm.value.name,
      phone: this.userForm.value.phoneNumber,
      instagram: this.userForm.value.instagram,
      id: clientId,
      services: [],
    };
    this.clientService.createClient(newClient);
  }
}
