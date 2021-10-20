import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { ClientsPageComponent } from './clients-page/clients-page.component';
import { EditClientComponent } from './clients-page/edit-client/edit-client.component';
import { AddClientComponent } from './clients-page/add-client/add-client.component';
import { ServiceListComponent } from './clients-page/service-list/service-list.component';
import { ClientCreateRecordComponent } from './clients-page/client-create-record/client-create-record.component';
import { RecordPageComponent } from './record-page/record-page.component';
import { CalendarComponent } from './common/calendar/calendar.component';
import { RecordItemComponent } from './record-page/record-item/record-item.component';
import { StatsPageComponent } from './stats-page/stats-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { ClientsService } from './shared/clientsService/clients.service';
import { ServicesService } from './shared/servicesService/services.service';
import { RouterModule, Routes } from '@angular/router';
import { ClientFilterPipe } from './shared/clientsService/client-filter-pipe';
import { FormsModule } from '@angular/forms';
import { EditServiceComponent } from './clients-page/edit-service/edit-service.component';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatOptionModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { RuDateAdapter } from './shared/RuDateAdapter';
import { TopComponent } from './common/top/top.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { RecordService } from './shared/recordService/record.service';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { CheckoutComponent } from './record-page/checkout/checkout.component';

import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeRu, 'ru');

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: '/clients', pathMatch: 'full' },
      { path: 'clients', component: ClientsPageComponent },
      { path: 'calendar', component: RecordPageComponent },
      { path: 'stats', component: StatsPageComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ClientsPageComponent,
    EditClientComponent,
    AddClientComponent,
    ServiceListComponent,
    ClientCreateRecordComponent,
    RecordPageComponent,
    CalendarComponent,
    RecordItemComponent,
    StatsPageComponent,
    ClientFilterPipe,
    EditServiceComponent,
    TopComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatGridListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [
    ClientsService,
    ServicesService,
    RecordService,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ru-Ru',
    },
    {
      provide: DateAdapter,
      useClass: RuDateAdapter,
    },
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
