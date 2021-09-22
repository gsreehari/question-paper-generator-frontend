import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import GlobalVars from '../../global'

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  private API_URL:string = new GlobalVars().API_URL;

  constructor( private http:HttpClient) { }

  getSubjects():Observable<any>{
    return this.http.get(`${this.API_URL}/subjects/getSubjects`);
  }

  getSubjectsByUser(id:string):Observable<any>{
    return this.http.get(`${this.API_URL}/subjects/getSubjectByUserId/${id}`);
  }

  getSubjectsCountByBranch():Observable<any>{
    return this.http.get(`${this.API_URL}/subjects/getSubjectsCountByBranch`);
  }

  getFacultyNames():Observable<any>{
    return this.http.get(`${this.API_URL}/users/getFacultyNames`);
  }

  getFacultyByBranch(branch:string):Observable<any>{
    return this.http.get(`${this.API_URL}/users/getFacultyByBranch/${branch}`);
  }

  insertSubjectIntoDb(subjectName,subjectScheme,subjectBranch,subjectYear,subjectSemister,units,subjectFaculty,subjectType, subjectCode, subjectCollege):Observable<any>{
    return this.http.post(`${this.API_URL}/subjects/createSubject`,{
      "subjectName":subjectName,
      "subjectScheme":subjectScheme,
      "subjectDepartment":subjectBranch,
      "subjectYear":subjectYear,
      "subjectSemister":subjectSemister,
      "subjectAddedBy": JSON.parse(localStorage.getItem('user')).userId,
      "subjectFaculty":subjectFaculty,
      "subjectUnits":units,
      "subjectType": subjectType,
      "subjectCode": subjectCode,
      "subjectCollege": subjectCollege
    })
    // SELECT users.userId,users.userDisplayName,GROUP_CONCAT(subject.subjectName) FROM `users` RIGHT OUTER JOIN subjectfaculty as sf ON users.userId = sf.userId INNER JOIN subject ON subject.subjectId = sf.subjectId GROUP BY sf.userId
  }

  getSubjectbyId(id:string):Observable<any>{
    return this.http.get(`${this.API_URL}/subjects/subject/${id}`)
  }

  updateSubject(data:any):Observable<any>{
    return this.http.patch(`${this.API_URL}/subjects/updateSubject`,data);
  }

  deletSubject(id:string):Observable<any>{
    return this.http.delete(`${this.API_URL}/subjects/deleteSubject/${id}`);
  }

  getSubjectsCount():Observable<any>{
    return this.http.get(`${this.API_URL}/subjects/getSubjectsCount`)
  }

}
