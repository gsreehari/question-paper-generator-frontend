import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '../../../../services/question/question.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  // dataSource:any;
  displayedColumns:string[] = ['questionId','question','subjectName','unit','questionMarks','addedBy','actions'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private questionService:QuestionService) { }

  ngOnInit(): void {
    
    var subjects = JSON.parse(localStorage.getItem('subjects'))
    var subjectsString = subjects.map(subject => subject.subjectId).join(',')
    
    this.questionService.getAllQuestionsBySubject(subjectsString).subscribe(res=>{
      this.addData(res);
    });
  }

  addData(res){
    res.data.forEach(element => {
      if(element.subjectUnits % 2 === 1){
        if(element.unit > Math.ceil(element.subjectUnits/2)){
          element.unit = element.unit-1;
        }
      }
    });
    this.dataSource = new MatTableDataSource(res.data)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  delete(id:string){
    if(confirm("Are you sure to delete")){
      this.questionService.deleteQuestion(id).subscribe(res=>{
        this.addData(res);
        console.log(res)
      })
    }
  }

}
