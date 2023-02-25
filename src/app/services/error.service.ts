import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

interface error {
  e: HttpErrorResponse | string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private _sanckBar: MatSnackBar) {}

  msgError({ e }: error) {
    if (e instanceof HttpErrorResponse) {
      if (e.error && e.error.msg) {
        this.callSnackBar('center', 'top', e.error.msg);
      } else {
        this.callSnackBar(
          'center',
          'top',
          'Hubo un error al realizar la tarea'
        );
      }
    } else {
      this.callSnackBar('center', 'top', e);
    }
  }

  private callSnackBar(
    h: MatSnackBarHorizontalPosition = "center",
    v: MatSnackBarVerticalPosition = "bottom",
    msg: string
  ) {
    this._sanckBar.open(msg, '', {
      horizontalPosition: h,
      verticalPosition: v,
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
