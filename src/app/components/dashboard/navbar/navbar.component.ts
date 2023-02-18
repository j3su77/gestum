import { Component, ViewChild } from '@angular/core';
import { ItemMenu } from '../../../interfaces/itemMenu';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  @ViewChild('sidenav') sidenav: MatSidenav;
  menu: ItemMenu[] = [];
  isExpanded = true;

  constructor(private router: Router, public dialogo: MatDialog) {}

  ngOnInit() {}

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

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
