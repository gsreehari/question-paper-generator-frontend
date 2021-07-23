import { Component, OnInit } from '@angular/core';
import { QuestionpaperService } from '../../../../services/questionpaper/questionpaper.service';
import {MatDialog} from '@angular/material/dialog';
import { QuestionpaperdataComponent } from './questionpaperdata/questionpaperdata.component';

@Component({
  selector: 'app-generatepaper',
  templateUrl: './generatepaper.component.html',
  styleUrls: ['./generatepaper.component.css']
})
export class GeneratepaperComponent implements OnInit {
  subjects:any;
  examDate:any = '';
  examType:string = '';
  questionPaper:any;
  showPaper:boolean = false;
  letters:string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q,','r','s','t','u','v','w','x','y','z']
  paperId:any = '';
  userId:string = '';
  constructor( private questionPaperService:QuestionpaperService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.subjects = JSON.parse(localStorage.getItem('subjects'));
    this.userId = JSON.parse(localStorage.getItem('user')).userId;
  }

  openDialog(subject:any): void {
    const dialogRef = this.dialog.open(QuestionpaperdataComponent, {
      width: '300px',
      data: {examType: this.examType, examDate: this.examDate,subjectName:subject.subjectName,subjectScheme:subject.subjectScheme}
    }).updateSize('400px','300px');


    dialogRef.afterClosed().subscribe(result => {
      this.examType = result.examType;
      this.examDate = result.examDate;
      console.log(result)

      if(this.examDate != "" && this.examType != ""){
        
        this.examDate = this.examDate.toString().split("-").reverse().join("-");
        subject['examDate'] = this.examDate;
        subject['examType'] = this.examType;
        
        this.questionPaperService.getQuestionPaper(subject,this.userId,"64560").subscribe(res=>{
          console.log(res)
          if(res.status === "fail"){
            return alert(res.message);
          }
          this.questionPaper = null;
          this.questionPaper = res.data;
          this.showPaper = true;
          this.paperId = this.questionPaper.id;
        })
      }else{
        alert("All fields are required")
      }
      
    })
  }

  paperprint(){
    var divContents = document.querySelector(".printdiv").innerHTML; 
    var a = window.open('', '', 'width=680'); 
    a.document.write('<html><body>'); 
    a.document.write(divContents); 
    a.document.write('</body></html>');
    a.print();
    a.document.close();
  }

  wordGenerate() {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      var postHtml = "</body></html>";
      var html = preHtml+document.querySelector('.main').innerHTML+postHtml;

      var blob = new Blob(['\ufeff', html], {
          type: 'application/msword'
      });
      
      // Specify link url
      var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
      
      // Specify file name
      var filename = 'document.doc';
      
      // Create download link element
      var downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);
      
      if(navigator.msSaveOrOpenBlob ){
          navigator.msSaveOrOpenBlob(blob, filename);
      }else{
          // Create a link to the file
          downloadLink.href = url;
          
          // Setting the file name
          downloadLink.download = filename;
          
          //triggering the function
          downloadLink.click();
      }
      
      document.body.removeChild(downloadLink);
  };

}
