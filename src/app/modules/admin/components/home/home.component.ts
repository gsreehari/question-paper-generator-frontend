import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { SocketService } from "../../../../services/socket.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  user = null;
  claims = null;
  toggle:Boolean = false;
  settingstoggle:Boolean = false;
  mnavopen:Boolean = false;
  chatusers:any = null;

  constructor(private socketService:SocketService,private router:Router,private activatedroute: ActivatedRoute) {
    this.user = JSON.parse(localStorage.getItem("user"));
    // this.userdata.setUser(this.user);
  }

  ngOnInit(){
    this.socketService.listen("newconnection").subscribe(res=>{
      console.log(res)
    })
  }

  isexpand(expand:Boolean){
    this.toggle = expand;
  }

  toggleSettings(){
    this.settingstoggle = !this.settingstoggle;
  }

  togglemnav(expand:Boolean){
    this.mnavopen = expand;
  }

  // ngOnInit(): void {
  //   this.getUser();
  //   console.log(this.user);
  // }

}
