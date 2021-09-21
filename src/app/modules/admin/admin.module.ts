import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterModule } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { SubjectsComponent } from './components/subject/subjects/subjects.component';
import { AddsubjectComponent } from './components/subject/addsubject/addsubject.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { SubjectComponent } from './components/subject/subject/subject.component';
import { UsersComponent } from './components/user/users/users.component';
import { AdduserComponent } from './components/user/adduser/adduser.component';
import { UserComponent } from './components/user/user/user.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { QuestionpapersComponent } from './components/questionpapers/questionpapers.component';
import { QuestionpaperComponent } from './components/questionpaper/questionpaper.component';
import { QuestionpapergeneratorComponent } from './components/questionpapergenerator/questionpapergenerator.component';
import { QuestionpaperdataComponent } from './components/questionpapergenerator/questionpaperdata/questionpaperdata.component';
import { PipesModule } from '../pipes/pipes.module';
import { ChartsModule } from 'ng2-charts';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { QuestionpapermodelComponent } from './components/questionpapermodel/questionpapermodel.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { AddbranchComponent } from './components/branch/addbranch/addbranch.component';
import { BranchsComponent } from './components/branch/branchs/branchs.component' ;

import { DataTableComponent } from '../../components/datatable/datatable.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, SidebarComponent, DashboardComponent, ProfileComponent, SubjectsComponent,DataTableComponent, AddsubjectComponent, SubjectComponent, UsersComponent, AdduserComponent, UserComponent, QuestionpapersComponent, QuestionpaperComponent, QuestionpapergeneratorComponent, QuestionpaperdataComponent, QuestionpapermodelComponent, AddbranchComponent, BranchsComponent],
  imports: [
    MatButtonModule,
    PipesModule.forRoot(),
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatTabsModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatSelectModule,
    ChartsModule,
    NgxJsonViewerModule,
    NgJsonEditorModule
  ],
  providers: [
  ],
  exports:[
    NgJsonEditorModule,NgxJsonViewerModule,ChartsModule,HomeComponent, HeaderComponent,DataTableComponent, SidebarComponent, DashboardComponent, ProfileComponent, SubjectsComponent, AddsubjectComponent, SubjectComponent, UsersComponent, AdduserComponent, UserComponent
  ],
})
export class AdminModule { }
