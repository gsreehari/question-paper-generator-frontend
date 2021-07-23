import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import GlobalVars from '../../global'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  islogged:boolean = false;
  user:any = null;
  private API_URL:string = new GlobalVars().API_URL;

  constructor(private http:HttpClient, private router:Router) {
    
  }

  checkToken(){
    return this.http.get(`${this.API_URL}/users/authenticateUser`)
  }
  
  signIn(username:string, password:string):Observable<any>{
    return this.http.post(`${this.API_URL}/users/login`,{
      "username":username,
      "password":password,
    })
  }

  getLocalToken(){
    return localStorage.getItem('token');
  }

  canRoute():boolean{
    return this.getLocalToken() ? true : false;
  }

  async signout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('subjects');
  }
}