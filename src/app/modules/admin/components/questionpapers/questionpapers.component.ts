import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionpaperService } from '../../../../services/questionpaper/questionpaper.service';

@Component({
  selector: 'app-questionpapers',
  templateUrl: './questionpapers.component.html',
  styleUrls: ['./questionpapers.component.css']
})
export class QuestionpapersComponent implements OnInit {

  displayedColumns:string[] = ['questionPaperId','subjectName','userDisplayName','generatedAt'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private qpservice:QuestionpaperService) { }

  ngOnInit(): void {
    this.qpservice.getAllQuestionPapers().subscribe((res)=>{
      this.addData(res);
      console.log(res.data)
    })
  }

  addData(res){
    this.dataSource = new MatTableDataSource(res.data)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
