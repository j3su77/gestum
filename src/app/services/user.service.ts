import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { User } from '../interfaces/user';
import { LoginInfo } from '../interfaces/loginUser';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})



export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "api/user/";
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user)
  }

  login(userLogin: LoginInfo): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}login`, userLogin)
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }

  getUserLogged(token: string): User {
    const user: User = jwt_decode(token);
    console.log(user);
    return user;
  }
}