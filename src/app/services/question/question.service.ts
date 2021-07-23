import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import GlobalVars from '../../global'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private API_URL:string = new GlobalVars().API_URL;

  constructor(private http:HttpClient) { }

  getAllQuestions():Observable<any>{
    return this.http.get(`${this.API_URL}/questions/getAllQuestions`);
  }

  getQuestionById(id:string):Observable<any>{
    return this.http.get(`${this.API_URL}/questions/getQuestionById/${id}`);
  }

  getQuestionsCountByUser(id:string):Observable<any>{
    return this.http.get(`${this.API_URL}/questions/getQuestionsCountByUser/${id}`);
  }

  getQuestionsCount():Observable<any>{
    return this.http.get(`${this.API_URL}/questions/getQuestionsCount`);
  }
  
  insertQuestion(formData:FormData):Observable<any>{
    return this.http.post(`${this.API_URL}/questions/addQuestion`,formData);
  }

  insertQuestionFromExcel(formData:any):Observable<any>{
    return this.http.post(`${this.API_URL}/questions/addQuestionFromExcel`,formData);
  }

  updateQuestion(data:FormData):Observable<any>{
    return this.http.patch(`${this.API_URL}/questions/updateQuestion`,data);
  }

  deleteQuestion(id:string):Observable<any>{
    return this.http.delete(`${this.API_URL}/questions/deleteQuestion/${id}`);
  }

}
