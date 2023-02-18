import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent {
  public isExpanded = false;
  public isShowing = false;

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }


}