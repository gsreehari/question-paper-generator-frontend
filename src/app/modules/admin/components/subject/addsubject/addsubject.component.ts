import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../../../../../services/subjects/subjects.service';
import {FormControl} from '@angular/forms';
import { BranchService } from '../../../../../services/branch/branch.service';

@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {

  faculty:any[] = [];
  degree:string = "";
  year:string = "";
  sem:string = "";
  scheme:string = "";
  branch:string = "";
  subjectName:string = "";
  subjectFaculty:string = "";
  subjectType:string = "";
  subjectCode:string = "";
  units:any = "";
  flist = new FormControl();
  department = "";

  yearList: any[] = []
  semList: any[] = []
  branches:any[] = [];

  constructor(private subjectService:SubjectsService,private branchService:BranchService) { }

  ngOnInit(): void {
    this.branchService.getBranches().subscribe((res)=>{
      this.branches = res.data
    })
  }

  getfaculty(department){
    console.log(department)
    this.subjectService.getFacultyByBranch(department).subscribe((res)=>{
      this.faculty = res.data
    })
  }

  formSubmit(){
    var list = this.flist.value;
    list = list.map((a:any) => a.userId);
    let college = JSON.parse(localStorage.getItem("user")).collegeId
    this.subjectService.insertSubjectIntoDb(this.subjectName,this.scheme,this.branch,this.year,this.sem,this.units,list,this.subjectType,this.subjectCode,college).subscribe((res)=>{
      if(res.code == 'SIS'){
        this.degree = "";
        this.year = "";
        this.sem = "";
        this.scheme = "";
        this.branch = "";
        this.subjectName = "";
        this.units = "";
        alert("Subject added")
      }else{
        alert(res.message)
      }
    })
  }

  changeBranch(e){
    this.degree = e.target.options[e.target.selectedIndex].dataset.degree;
    this.branch = e.target.value;
    
    this.yearList = []
    this.semList = []

    console.log(e.target.value)

    if(this.degree == 'B.Tech'){
      for(let i=1;i<=4;i++){
        let num = this.convert(i);
        this.yearList.push(num)
      }
    }
    else if(this.degree == 'M.Tech'){
      for(let i=1;i<=2;i++){
        let num = this.convert(i);
        this.yearList.push(num)
      }
    }
  }

  changeFacultyBranch(e){
    this.department = e.value;
    this.getfaculty(this.department);
  }


  changeYear(e){
    this.year = e.target.value;
    let year = this.roman_to_Int(this.year)
    this.semList = []
    let y = year+(year-1)
    this.semList.push(this.convert(y))
    this.semList.push(this.convert(y+1))
  }

  changeSem(e){
    this.sem = e.target.value;
  }

  changeFaculty(e){
    this.subjectFaculty = e.target.value;
  }

  changesSubjectType(e){
    this.subjectType = e.target.value;
  }

  
  convert(num) {

    var result = '';
    var rom = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    var ara = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    for (var x = 0; x < rom.length; x++) {
      while (num >= ara[x]) {
        result += rom[x];
        num -= ara[x];
      }
    }
    return result;
  }

  roman_to_Int(str1) {
    if(str1 == null) return -1;
      var num = this.char_to_int(str1.charAt(0));
      var pre, curr;
      
      for(var i = 1; i < str1.length; i++){
        curr = this.char_to_int(str1.charAt(i));
        pre = this.char_to_int(str1.charAt(i-1));
        if(curr <= pre){
          num += curr;
        } else {
          num = num - pre*2 + curr;
        }
      }
      
      return num;
    }
    
    char_to_int(c){
      switch (c){
      case 'I': return 1;
      case 'V': return 5;
      case 'X': return 10;
      case 'L': return 50;
      case 'C': return 100;
      case 'D': return 500;
      case 'M': return 1000;
      default: return -1;
      }
    }

}
