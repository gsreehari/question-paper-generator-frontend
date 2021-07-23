import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../../services/question/question.service';
import GlobalVars from '../../../../global'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router, private questionService:QuestionService) { }

  questionId:string = '';
  questionData:any = '';
  question:string = ''; 
  questionImg:any = null; 
  unit:any = '';
  marks:any = '';
  fileToUpload:File;
  formEdit:boolean = false;
  ImageUrl:string = new GlobalVars().ImagesURL;

  ngOnInit(): void {
    console.log(this.ImageUrl);
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.questionService.getQuestionById(this.questionId).subscribe((res)=>{
      console.log(res);
      if(res.status == "error"){
        alert(res.message)
        this.router.navigateByUrl("faculty/questions");
      }
      this.questionData = res.data;
      this.question = this.questionData.question;
      this.unit = this.questionData.unit;
      this.marks = this.questionData.questionMarks;
      this.questionImg = this.questionData.questionImage;
    })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  submit(){
    var formdata = new FormData();
    formdata.append('question',this.question);
    formdata.append('questionId',this.questionId);
    formdata.append('questionUnit',this.unit);
    formdata.append('questionMarks',this.marks);
    if(this.fileToUpload){
      formdata.append('file',this.fileToUpload);
    }else{
      formdata.append('file','');
    }
    this.questionService.updateQuestion(formdata).subscribe((res)=>{
      if(res.status == "fail"){
        return alert("error");
      }
      alert(res.message);
      this.questionData = res.data;
    })
  }

  changeEdit(){
    this.formEdit = !this.formEdit;
  }

}
