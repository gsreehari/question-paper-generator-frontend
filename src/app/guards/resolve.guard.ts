import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsersService } from '../services/users/users.service';
import { QuestionService } from '../services/question/question.service';
import { QuestionpaperService } from '../services/questionpaper/questionpaper.service';
import { SubjectsService } from '../services/subjects/subjects.service';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FacultyCountResolve implements Resolve<any> {

  constructor(private subjectService:SubjectsService, private questionsService:QuestionService,private questionpaperService:QuestionpaperService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
    var userdata = JSON.parse(localStorage.getItem('user'));
    return of(
      {
        subjectsCount:this.subjectService.getSubjectsByUser(userdata.userId),
        questionsCount:this.questionsService.getQuestionsCountByUser(userdata.userId),
        paperCount:this.questionpaperService.getQuestionPaperByUserId(userdata.userId)
      }
    )
  }
}


@Injectable({
  providedIn: 'root'
})
export class AdminCountResolve implements Resolve<any> {

  constructor(private usersService:UsersService, private subjectsService:SubjectsService, private questionsService:QuestionService,private questionpaperService:QuestionpaperService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
    var userdata = JSON.parse(localStorage.getItem('user'));
    return of(
      {
        usersCount:this.usersService.getUsersCount(),
        subjectsCount:this.subjectsService.getSubjectsCount(),
        questionsCount:this.questionsService.getQuestionsCount(),
        paperCount:this.questionpaperService.getQuestionPapersCount(),
        subjectsCountByBranch:this.subjectsService.getSubjectsCountByBranch()
      }
    )
  }
}
