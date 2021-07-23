import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Output() isexpand = new EventEmitter<Boolean>();
  // @Output() mnavexpand = new EventEmitter<Boolean>();

  expand:Boolean = true;
  rightexpand:Boolean = false;
  mnavopen:Boolean = false;
  userdata;
  showqlist:boolean = false;

  constructor(private service: AuthService,private router:Router) {
    this.userdata = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }

  toggleQList(){
    this.showqlist = !this.showqlist;
  }

  async logout(){
    await this.service.signout();
  } 

}
