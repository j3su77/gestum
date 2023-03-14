import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent {
  public isExpanded = false;
  public isShowing = false;
  public isMobile = false;

  constructor(private _themeService: ThemeService) {}

  ngOnInit(): void {
  
    this._themeService.isExpanded$.subscribe((isExpanded) => {
      this.isExpanded = isExpanded;
    });

    this._themeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }


  toggleMenu() {
    this._themeService.toggleMenu();
  }
}
