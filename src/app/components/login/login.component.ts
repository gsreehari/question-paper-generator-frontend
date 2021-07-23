import { Component, OnInit,ComponentFactoryResolver} from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";
import { FormControl,FormGroup, Validators, FormsModule } from "@angular/forms";
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginType:number = 2;
  initial:boolean = true;

  constructor(public loadingService:LoaderService,private service:AuthService,private router:Router,private notifyService:NotificationService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadingService.isLoading.next(false);
  }

  loginForm:FormGroup  = new FormGroup({
    username: new FormControl('sreehari61',[Validators.required]),
    password: new FormControl('8497961326',[Validators.required]),
  })

  get username (){
    return this.loginForm.get('username');
  }

  get password (){
    return this.loginForm.get('password');
  }

  changeLogin(type:number){
    this.initial = false;
    this.loginType = type;
  }

  show(){
    this.notifyService.showError("No user with this role", "error")
  }

  submit(){
    this.service.signIn(this.username.value,this.password.value).subscribe((res)=>{
      if(res.code === 'LS'){
        let roles = res.result.roles;
        console.log(roles,this.loginType);
        if(roles.includes(this.loginType+1)){
            localStorage.setItem('token',res.token);
            res.result['currentRole'] = this.loginType;
            localStorage.setItem('user',JSON.stringify(res.result));
            this.router.navigate([`/${this.loginType+1 === 2 ?'admin' : 'faculty'}`]);
        }else{
          alert("No user with this role");
          this.notifyService.showError("No user with this role", "error")
        }
      }else{
        alert(res.message);
        this.toastr.error(res.message, "error")
      }
    });
  }



}
