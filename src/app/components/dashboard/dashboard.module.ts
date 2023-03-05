import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ServicesComponent } from './servicios/services.component';
import { RequestsComponent } from './requests/requests.component';
import { ClientsComponent } from './clients/clients.component';
import { EjecutoresComponent } from './ejecutores/ejecutores.component';
import { LoadingService } from '../../services/loading.service';





@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    ServicesComponent,
    RequestsComponent,
    ClientsComponent,
    EjecutoresComponent,
  ],

  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
  ],
  providers: [
    LoadingService
  ]
})
export class DashboardModule { }
