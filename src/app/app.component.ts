import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ClientsService } from './shared/clientsService/clients.service';
import { ServicesService } from './shared/servicesService/services.service';
import { RecordService } from './shared/recordService/record.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'nail-app';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private clientService: ClientsService,
    private serviceService: ServicesService,
    private recordService: RecordService,
  ) {
    this.matIconRegistry.addSvgIcon(
      'back',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/back.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'cross',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/cross.svg'),
    );
  }
}
