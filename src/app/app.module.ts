import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FacultyCountResolve, AdminCountResolve } from "./guards/resolve.guard";
import { AdminModule } from "./modules/admin/admin.module";
import { FacultyModule } from './modules/faculty/faculty.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AuthService } from "./services/auth/auth.service";
import { FormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { LoaderComponent } from './components/loader/loader.component';
import { HttpService } from './services/httpservice/httpservice.service';
import {MatTableModule} from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
import { QuestionpaperComponent } from './components/questionpaper/questionpaper.component';
import {SocketService} from './services/socket.service'
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChartsModule } from 'ng2-charts';

 
const config: SocketIoConfig = { url: "http://localhost:3000", options: {transport : ['websocket']} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    LoaderComponent,
    QuestionpaperComponent,
  ],
  imports: [
    BrowserModule,
    AdminModule,
    FacultyModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    AngularFireAuthModule,
    MatTableModule,
    MatProgressBarModule,
    ToastrModule.forRoot({
      timeOut:10000,
      progressBar:true,
      positionClass: 'toast-bottom-right',
    }),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    FacultyCountResolve,
    AdminCountResolve,
    AuthService,
    SocketService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpService, multi: true }
  ],
  exports:[
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
