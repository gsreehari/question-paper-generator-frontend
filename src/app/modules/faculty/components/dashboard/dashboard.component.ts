import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../../services/question/question.service';
import { QuestionpaperService } from '../../../../services/questionpaper/questionpaper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  subjectsCount:number = 0;
  userdata:any;
  questionsCount:number = 0;
  questionPaperCount:number=0;

  constructor(private route: ActivatedRoute , private questionsService:QuestionService, private questionPaperService:QuestionpaperService) { }

  ngOnInit(): void {
    this.route.snapshot.data.data.questionsCount.subscribe(res=>{
      this.questionsCount = res.data.count;
    });
    this.route.snapshot.data.data.paperCount.subscribe(res=>{
      this.questionPaperCount = res.data.count;
    });
    this.route.snapshot.data.data.subjectsCount.subscribe(res=>{
      this.subjectsCount = res.data.length;
    });
  }

}