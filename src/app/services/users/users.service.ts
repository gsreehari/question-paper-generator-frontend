import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import GlobalVars from '../../global'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API_URL:string = new GlobalVars().API_URL;

  constructor(private http:HttpClient) { }

  insertUserIntoDb(userName:string,Email:string,Password:string,branch:string,roles:number[]):Observable<any>{
    return this.http.post(`${this.API_URL}/users/createUser`,{
      userName:userName,
      userEmail:Email,
      userPassword:Password,
      userBranch:branch,
      userCollege:"64560",
      userRole:roles
    })
  }

  getAllUsers():Observable<any>{
    return this.http.get(`${this.API_URL}/users/getUsers`);
  }

  getUserById(id:string):Observable<any>{
    return this.http.get(`${this.API_URL}/users/getUser/${id}`);
  }
  
  getUsersCount():Observable<any>{
    return this.http.get(`${this.API_URL}/users/getUsersCountByRoles`);
  }

  updateUserStatus(uid:string, status:number):Observable<any>{
    return this.http.patch(`${this.API_URL}/users/updateUsersStatus`,{
      uid:uid,
      status:status
    }) 
  }

  updateProfilePic(data:FormData):Observable<any>{
    return this.http.patch(`${this.API_URL}/users/updateUserProfilePic`,data);
  }

  updateRoles(data:any):Observable<any>{
    return this.http.patch(`${this.API_URL}/users/updateUserRoles`,data);
  }

  deleteUser(id:String):Observable<any>{
    return this.http.delete(`${this.API_URL}/users/deleteUser/${id}`);
  }

}
