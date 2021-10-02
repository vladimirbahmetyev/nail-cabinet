import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { ClientsPageComponent } from './clients-page/clients-page.component';
import { EditClientComponent } from './clients-page/edit-client/edit-client.component';
import { AddClientComponent } from './clients-page/add-client/add-client.component';
import { ServiceListComponent } from './clients-page/service-list/service-list.component';
import { AddServiceComponent } from './clients-page/add-service/add-service.component';
import { RecordPageComponent } from './record-page/record-page.component';
import { CalendarComponent } from './common/calendar/calendar.component';
import { RecordItemComponent } from './record-page/record-item/record-item.component';
import { StatsPageComponent } from './stats-page/stats-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from "@angular/material/list";
import {ClientsService} from "./shared/clientsService/clients.service";
import {ServicesService} from "./shared/servicesService/services.service";
import {RouterModule, Routes} from "@angular/router";
import {ClientFilterPipe} from "./shared/clientsService/client-filter-pipe";
import {FormsModule} from "@angular/forms";
import { EditServiceComponent } from './clients-page/edit-service/edit-service.component';
import {DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {RuDateAdapter} from "./shared/RuDateAdapter";
import { TopComponent } from './common/top/top.component';

const appRoutes : Routes = [
  {path: '', component: AppComponent},
  {path: 'clients', component: ClientsPageComponent},
  {path: 'calendar', component: RecordPageComponent},
  {path: 'stats', component: StatsPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ClientsPageComponent,
    EditClientComponent,
    AddClientComponent,
    ServiceListComponent,
    AddServiceComponent,
    RecordPageComponent,
    CalendarComponent,
    RecordItemComponent,
    StatsPageComponent,
    ClientFilterPipe,
    EditServiceComponent,
    TopComponent,
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
  ],
  providers: [
    ClientsService,
    ServicesService,
    {
      provide: MAT_DATE_LOCALE, useValue: "ru-Ru"
    },
    {
      provide: DateAdapter,
      useClass: RuDateAdapter
    }, MatDatepickerModule,],
  bootstrap: [AppComponent]
})
export class AppModule { }
