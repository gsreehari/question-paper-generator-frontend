import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import GlobalVars from '../../global';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http:HttpClient) { }
  private API_URL:string = new GlobalVars().API_URL;

  addBranch(data:any):Observable<any>{
    return this.http.post(`${this.API_URL}/branch/createBranch`,data)
  }

  getBranches():Observable<any>{
    return this.http.get(`${this.API_URL}/branch/getBranches`)
  }

}
