import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubjectsService } from '../../../../services/subjects/subjects.service';
import { SocketService } from "../../../../services/socket.service";
import { QuestionpaperService } from '../../../../services/questionpaper/questionpaper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = null;
  claims = null;
  toggle:Boolean = false;
  settingstoggle:Boolean = false;
  mnavopen:Boolean = false;
  chatusers:any = null;

  constructor(private Questionpaperservice:QuestionpaperService, private socketService:SocketService,private subjectService:SubjectsService) {
    // this.userdata.setUser(this.user);
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
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.subjectService.getSubjectsByUser(this.user.userId).subscribe(res=>{
      localStorage.setItem('subjects',JSON.stringify(res.data))
    })

    this.Questionpaperservice.getQuestionPaperByUserId(this.user.userId).subscribe(res=>{
      console.log(res);
    })
  }

}
