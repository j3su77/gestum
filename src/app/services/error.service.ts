import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';

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
        this._sanckBar.open(e.error.msg, 'Error', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
        });
      } else {
        this._sanckBar.open(
          'Error inesperado, por favor comuniquese con el administrador',
          'Error',
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          }
        );
      }
    } else {
      this._sanckBar.open(e, 'Error', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
      });
    }
  }
}
