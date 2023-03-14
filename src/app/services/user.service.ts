import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { User } from '../interfaces/user';
import { LoginInfo } from '../interfaces/loginUser';
import jwt_decode from 'jwt-decode';


interface data {
  msg: string
}


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "api/users/";
  }

 
  getInfoUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.myAppUrl}${this.myApiUrl}${id}`, user)
  }

  updatePassword(id: number, data: any): Observable<data> {
    return this.http.put<data>(`${this.myAppUrl}${this.myApiUrl}${id}/change-password`, data)
  }

  getUsers(tipo: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}?type=${tipo}`)
  }
  
}