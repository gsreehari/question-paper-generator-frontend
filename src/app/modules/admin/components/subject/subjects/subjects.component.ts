import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SubjectsService} from '../../../../../services/subjects/subjects.service';
// import {MatPaginator} from '@angular/material/paginator';
// import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  dataSource:any = null;
  displayedColumns:string[] = ['subjectId','subjectCode','subjectName','subjectDegree','subjectScheme','subjectBranch','subjectYear','subjectSemister','subjectAddedBy','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private subjectsservice:SubjectsService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(){
    this.subjectsservice.getSubjects().subscribe((res)=>{
      this.dataSource = null;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(res.data)
    })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  deleteSubject(id){
    this.subjectsservice.deletSubject(id).subscribe((res)=>{
      this.dataSource = res.data;
    })
  }

}
