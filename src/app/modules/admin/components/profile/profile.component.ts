import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { UsersService } from '../../../../services/users/users.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData:any = null;
  login:any = 0;
  signUp:any = 0;
  fileToUpload: File = null;

  constructor(@Inject(DOCUMENT) private _document: Document,private service:AuthService, private usersService: UsersService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    if(this.fileToUpload != null){
      var formdata = new FormData();
      formdata.append('file',this.fileToUpload);
      formdata.append('userId',this.userData.userId);
      this.usersService.updateProfilePic(formdata).subscribe(res=>{
        console.log(res);
        if(res.status == "success"){
          res.data.currentRole = this.userData.currentRole;
          localStorage.setItem('user',JSON.stringify(res.data));
          this.userData = res.data;
          this._document.defaultView.location.reload();
        }
      })
    }
    
  }
}
