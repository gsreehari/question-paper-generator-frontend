import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { HomeComponent as adminHome} from "./modules/admin/components/home/home.component";
import { DashboardComponent as AdminDashboardComponent} from "./modules/admin/components/dashboard/dashboard.component";
import { AdminCountResolve, FacultyCountResolve } from './guards/resolve.guard';
import { ProfileComponent } from './modules/admin/components/profile/profile.component';
import { SubjectsComponent } from './modules/admin/components/subject/subjects/subjects.component';
import { AddsubjectComponent } from './modules/admin/components/subject/addsubject/addsubject.component';
import { AuthGuard } from './guards/auth.guard'
import { SubjectComponent } from './modules/admin/components/subject/subject/subject.component';
import { UsersComponent } from './modules/admin/components/user/users/users.component';
import { UserComponent } from './modules/admin/components/user/user/user.component';
import { AdduserComponent } from './modules/admin/components/user/adduser/adduser.component';

import { HomeComponent as facultyHome} from './modules/faculty/components/home/home.component';
import { DashboardComponent as FacultyDashboardComponent } from './modules/faculty/components/dashboard/dashboard.component'
import { AddquestionComponent } from "./modules/faculty/components/addquestion/addquestion.component";
import { QuestionsComponent } from "./modules/faculty/components/questions/questions.component";
import { GeneratepaperComponent } from "./modules/faculty/components/generatepaper/generatepaper.component";
import { QuestionComponent } from './modules/faculty/components/question/question.component';
import { QuestionpapersComponent } from './modules/admin/components/questionpapers/questionpapers.component';
import { QuestionpaperComponent as AdminQuestionpaperComponent} from './modules/admin/components/questionpaper/questionpaper.component';
import { QuestionpapergeneratorComponent } from './modules/admin/components/questionpapergenerator/questionpapergenerator.component'
import { QuestionpapermodelComponent } from './modules/admin/components/questionpapermodel/questionpapermodel.component'
import { QuestionpaperComponent as FacultyQuestionpaperComponent} from './modules/faculty/components/questionpaper/questionpaper.component'
import { AddbranchComponent } from './modules/admin/components/branch/addbranch/addbranch.component'

const routes: Routes = [
  {
    path:"reset password",
    component :ResetPasswordComponent,
  },
  {
    path:"admin",
    component : adminHome,
    resolve:{
      data:AdminCountResolve
    },
    canActivate: [AuthGuard],
    children:[
      {
        path:"",
        pathMatch : "full",
        component :AdminDashboardComponent
      },
      {
        path:"profile",
        component :ProfileComponent,
      },
      {
        path:"questionPapers",
        component :QuestionpapersComponent,
      },
      {
        path:"questionPaper/:paperId",
        component :AdminQuestionpaperComponent,
      },
      {
        path:"generatequestionpaper",
        component :QuestionpapergeneratorComponent,
      },
      {
        path:"user",
        children:[
          {
            path:"",
            pathMatch : "full",
            component :UsersComponent
          },
          {
            path:"user/:userid",
            pathMatch : "full",
            component :UserComponent
          },
          {
            path:"adduser",
            pathMatch : "full",
            component :AdduserComponent
          },
          
        ]
      },
      {
        path:'branch',
        children:[
          // {
          //   path:'',
          //   pathMatch: 'full',
          // },
          {
            path:'addBranch',
            component: AddbranchComponent
          }
        ]
      },
      {
        path:"subject",
        children:[
          {
            path:"",
            pathMatch : "full",
            component :SubjectsComponent
          },
          {
            path:"subject/:subjectid",
            pathMatch : "full",
            component :SubjectComponent
          },
          {
            path:"addsubject",
            pathMatch : "full",
            component :AddsubjectComponent
          },
          
        ]
      },
      {
        path:"questionPaperModel",
        component :QuestionpapermodelComponent,
      },
    ]
  },
  {
    path:"faculty",
    component : facultyHome,
    resolve:{
      data:FacultyCountResolve,
    },
    canActivate: [AuthGuard],
    children:[
      {
        path:"",
        pathMatch : "full",
        component :FacultyDashboardComponent
      },
      {
        path:"profile",
        component :ProfileComponent,
      },
      {
        path:"addquestions",
        component :AddquestionComponent,
      },
      {
        path:"questions",
        component :QuestionsComponent,
      },
      {
        path:"question/:questionId",
        component :QuestionComponent,
      },
      {
        path:"generatepaper",
        component :GeneratepaperComponent,
      },
      {
        path:"questionpaper",
        component :FacultyQuestionpaperComponent,
      },
    ]
    
  },
  
  {
    path:"",
    pathMatch: 'full',
    component :LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
