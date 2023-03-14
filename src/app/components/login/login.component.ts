import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ErrorService } from '../../services/error.service';
import { LoginInfo } from '../../interfaces/loginUser';
import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { User } from '../../interfaces/user';
import { LoadingService } from '../../services/loading.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  email: string = '';
  password: string = '';
  hide: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private _sanckBar: MatSnackBar,
    private router: Router,
    public loadingService: LoadingService,
    private _authService: AuthService,
    private _errorService: ErrorService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  onLogin() {
    if (this.form.value.email == '' || this.form.value.password == '') {
      this._errorService.msgError({ e: 'Todos los campos son requeridos' });
      return;
    }

    const user: LoginInfo = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.loadingService.show();
    this._authService.login(user).subscribe({
      next: async (data) => {
        this.loadingService.hide();
        this._authService.setToken(data);
        const user = await this._authService.getUserLogged();

        await this.router.navigate(['/dashboard']);
        this._sanckBar.open(`Bienvenido al sistema, Sr(a) ${user!.nombre} ${user!.apellidos}`, "cerrar",  {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ["success-snackbar"]
        })
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msgError({ e });
        this.loadingService.hide();
      },
    });
  }
}
