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


type options = {
  event: MatSlideToggleChange | boolean
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  @ViewChild('sidenav') sidenav: MatSidenav;
  menu: ItemMenu[] = [];
  isExpanded = true;
  loading = true;
  isDarkTheme: boolean = false;
  user: User

  constructor(private themeService: ThemeService, public loadingService: LoadingService,private router: Router, public dialogo: MatDialog,  private _userService: UserService) {
  
  }

  async ngOnInit() {
    this.isDarkTheme = (localStorage.getItem("isDark") === "true") || false;
    this.user = await this._userService.getUserLogged(this._userService.getToken()!);
  }

  waitConfirmation() {
    this.dialogo
      .open(ConfirmationDialogComponent, {
        data: `¿Esta seguro que desea cerrar sesión?`,
      })
      .afterClosed()
      .subscribe((confirmed: Boolean) => {
        if (confirmed) {
          this.logOut();
        }
      });
  }

  async toggleDarkMode(event: boolean) {
    this.isDarkTheme = event;
    await this.themeService.setDarkMode(this.isDarkTheme);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
