import { Component, ViewChild } from '@angular/core';
import { ItemMenu } from '../../../interfaces/itemMenu';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { LoadingService } from '../../../services/loading.service';
import { FormControl } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { ErrorService } from '../../../services/error.service';

type options = {
  event: MatSlideToggleChange | boolean;
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  menu: ItemMenu[] = [];
  loading = true;
  isDarkTheme: boolean = false;
  user: User;
  public isMobile = false;

  
  constructor(
    private themeService: ThemeService,
    public loadingService: LoadingService,
    private router: Router,
    public dialogo: MatDialog,
    private _authService: AuthService,
    private _themeService: ThemeService
  ) {
    
  }

  async ngOnInit() {
    this.isDarkTheme = localStorage.getItem('isDark') === 'true' || false;
    const user = await this._authService.getUserLogged();
    this.user = user!;

    this._themeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  waitConfirmation() {
    this.dialogo
      .open(ConfirmationDialogComponent, {
        data: `¿Esta seguro que desea cerrar sesión?`,
      })
      .afterClosed()
      .subscribe((confirmed: Boolean) => {
        if (confirmed) {
          this._authService.logOut();
        }
      });
  }

  async toggleDarkMode(event: boolean) {
    this.isDarkTheme = event;
    await this.themeService.setDarkMode(this.isDarkTheme);
  }

  toggleMenu() {
     this.themeService.toggleMenu();
  }

  getIsExpanded() {
   return this.themeService.getIsExpanded();
  }
}
