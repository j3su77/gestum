import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ErrorService } from '../../services/error.service';
import { matchValidator } from '../../utils/match-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  email: string = '';
  phone: number;
  password: string = '';
  confirmPassword: string = '';

  loading: boolean = false;
  hide: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _sanckBar: MatSnackBar,
    private router: Router,
    private _userService: UserService,
    private _errorService: ErrorService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required ]],
      email: ['', [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10) ]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required , matchValidator('password') ]],
    });
  }

  onRegister() {

  }
}
