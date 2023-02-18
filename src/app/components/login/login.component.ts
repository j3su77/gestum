import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ErrorService } from '../../services/error.service';
import { LoginInfo } from '../../interfaces/loginUser';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _sanckBar: MatSnackBar,
    private router: Router,
    private _userService: UserService,
    private _errorService: ErrorService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    console.log(this.form.value.email);
    if (this.form.value.email == '' || this.form.value.password == '') {
      this._errorService.msgError({ e: 'Todos los campos son requeridos' });
      return;
    }

    const user: LoginInfo = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (data) => {
        localStorage.setItem('token', data);
        this.router.navigate(['/dashboard']);
        this._sanckBar.open(`Bienvenido al sistema, sr ${user.email}`, "",  {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
        })
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msgError({ e });
        this.loading = false;
      },
    });
  }
}