import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authservice: AuthService, private router:Router,private loadingService:LoaderService) {
    this.check();
  }

  ngOnInit(): void {}

  async check(){
    // this.loadingService.isLoading.next(true);
    var a = await this.authservice.getLocalToken();
    if(a != null && a != ""){
      this.authservice.checkToken().subscribe(
        (res:any)=>{
          if(res.code == "VT"){
            var user = JSON.parse(localStorage.getItem('user'));
            switch(user.currentRole){
              case 1: this.router.navigate([`/admin`]); break;
              case 2: this.router.navigate([`/faculty`]); break;
              default : alert("Invalid role");
            }
            // this.router.navigate([`/admin`]);
          }else{
            this.router.navigate([``]);
          }
        }
      );
    }else{
      this.router.navigate([``]);
    }
    // this.loadingService.isLoading.next(false);
  }

}
