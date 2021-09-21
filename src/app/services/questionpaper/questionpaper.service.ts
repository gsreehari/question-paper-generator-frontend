import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import GlobalVars from '../../global'

@Injectable({
  providedIn: 'root'
})
export class QuestionpaperService {

  private API_URL:string = new GlobalVars().API_URL;

  constructor(private http:HttpClient) { }

  getAllQuestionPapers():Observable<any>{
    return this.http.get(
      `${this.API_URL}/questionpaper/getAllQuestionPapers`
    );
  }

  getQuestionPaperById(id:string):Observable<any>{
    return this.http.get(
      `${this.API_URL}/questionpaper/getQuestionPaperById/${id}`
    );
  }

  getQuestionPapersCount():Observable<any>{
    return this.http.get(`${this.API_URL}/questionpaper/getQuestionPapersCount`);
  }

  getQuestionPaper(data:any,user:string,collegeId:string):Observable<any>{
    return this.http.get(
      `${this.API_URL}/questionpaper/generate/?type=${data.examType}&subject=${data.subjectName}|${data.subjectId}&subjectCode=${data.subjectCode}&subjectType=${data.subjectType}&scheme=${data.subjectScheme}&branch=${data.subjectBranch}&degree=${data.subjectDegree}&sem=${data.subjectSemister}&date=${data.examDate}&user=${user}&collegeId=${collegeId}`
    );
  }

  getQuestionPaperByUserId(id:string):Observable<any>{
    var id = id != "" ? id : null
    return this.http.get(`${this.API_URL}/questionpaper/getQuestionPaperByUserId/${id}`);
  }

  getQuestionPaperCountByUserId(id:string):Observable<any>{
    var id = id != "" ? id : null
    return this.http.get(`${this.API_URL}/questionpaper/getQuestionPaperCountByUser/${id}`);
  }


}
