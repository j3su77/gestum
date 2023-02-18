import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemMenu } from '../interfaces/itemMenu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { 
  }
  getMenu(): Observable<ItemMenu[]>{
    return this.http.get<ItemMenu[]>("./assets/data/itemMenu.json")
  }
}
