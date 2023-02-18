import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './servicios/services.component';
import { AuthGuard } from '../../utils/auth.guard';
import { RequestsComponent } from './requests/requests.component';
import { ClientsComponent } from './clients/clients.component';
import { EjecutoresComponent } from './ejecutores/ejecutores.component';





const routes: Routes = [
  {path: "" , component: DashboardComponent, children: [
    {path: "", component: HomeComponent},
    {path: "servicios", component: ServicesComponent},
    {path: "solicitudes", component: RequestsComponent},
    {path: "clientes", component: ClientsComponent},
    {path: "ejecutores", component: EjecutoresComponent},

    { path: '**', redirectTo: '', pathMatch: 'full'},
  ], canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
