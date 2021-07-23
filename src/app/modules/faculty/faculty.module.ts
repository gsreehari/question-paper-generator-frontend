import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddquestionComponent } from './components/addquestion/addquestion.component';
import { SubjectComponent } from './components/subject/subject.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GeneratepaperComponent } from './components/generatepaper/generatepaper.component';
import { QuestionpaperdataComponent } from './components/generatepaper/questionpaperdata/questionpaperdata.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionpaperComponent } from './components/questionpaper/questionpaper.component';


@NgModule({
  // declarations: [HomeComponent, HeaderComponent, SidebarComponent, DashboardComponent, ProfileComponent],
  imports: [
    // BrowserModule,
    CommonModule,
    MatButtonModule,
    // AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule
  ],
  providers: [
    // ChatService,
  ],
  declarations: [HomeComponent, HeaderComponent, SidebarComponent, DashboardComponent, AddquestionComponent, SubjectComponent, QuestionsComponent, GeneratepaperComponent, QuestionpaperdataComponent, QuestionComponent, QuestionpaperComponent],
  // exports:[
  //   HomeComponent, HeaderComponent, SidebarComponent,DashboardComponent, ProfileComponent, ChatComponent, ChatboxComponent,
  // ],
})
export class FacultyModule { }
