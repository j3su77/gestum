import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { User } from '../interfaces/user';
import { LoginInfo } from '../interfaces/loginUser';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _errorService: ErrorService
  ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/auth/';
  }

  // signIn(user: User): Observable<any> {
  //   return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user)
  // }

  login(userLogin: LoginInfo): Observable<string> {
    return this.http.post<string>(
      `${this.myAppUrl}${this.myApiUrl}`,
      userLogin
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  getUserLogged(): User {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorAuth()
    }
    const user: User = jwt_decode(token!);
    if (!user) {
      this.errorAuth()
    }
    return user;
  }

  getRoleUser(): string | null {
    const user = this.getUserLogged();
    if (!user) return null;
    return user.rol;
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  private errorAuth() {
    this.router.navigate(['/']);
    this._errorService.msgError({
      e: 'Lo sentimos pero ocurrió un error con las credenciales, por favor vuelva a iniciar sesión',
    });
  }
}
