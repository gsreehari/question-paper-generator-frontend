import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionpaperService } from '../../../../services/questionpaper/questionpaper.service';
import { SubjectsService } from "../../../../services/subjects/subjects.service";
import { QuestionpaperdataComponent } from './questionpaperdata/questionpaperdata.component'

@Component({
  selector: 'app-questionpapergenerator',
  templateUrl: './questionpapergenerator.component.html',
  styleUrls: ['./questionpapergenerator.component.css']
})
export class QuestionpapergeneratorComponent implements OnInit {

  dataSource:any = null;
  displayedColumns:string[] = ['subjectId','subjectName','subjectScheme','subjectBranch','subjectSemister','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  examDate:any = '';
  examType:string = '';
  questionPaper: any;
  paperId: any;
  userId: any;
  showPaper:boolean = false;
  letters:string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q,','r','s','t','u','v','w','x','y','z']

  constructor(private subjectsservice:SubjectsService,private questionPaperService:QuestionpaperService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).userId;
    this.getSubjects();
  }

  getSubjects(){
    this.subjectsservice.getSubjects().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res.data)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openDialog(subject:any): void {
    console.log(subject);
    const dialogRef = this.dialog.open(QuestionpaperdataComponent, {
      width: '300px',
      data: {examType: this.examType, examDate: this.examDate,subjectName:subject.subjectName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.examType = result.examType;
      this.examDate = result.examDate;
      this.examDate = this.examDate.toString().split("-").reverse().join("-");
      subject['examDate'] = this.examDate;
      subject['examType'] = this.examType;
      this.questionPaperService.getQuestionPaper(subject,this.userId,"1766210230").subscribe(res=>{
        if(res.status === "fail"){
          console.log(res);
          return alert(res.message);
        }
        this.questionPaper = res.data;
        this.paperId = this.questionPaper.id;
        this.showPaper = true;
        console.log(this.questionPaper)
      })
      // this.animal = result;
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
