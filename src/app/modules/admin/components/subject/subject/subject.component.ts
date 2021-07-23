import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {SubjectsService} from '../../../../../services/subjects/subjects.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  faculty:any[] = [];
  degree:String = "";
  year:String = "";
  semister:String = "";
  scheme:String = "";
  branch:String = "";
  subjectName:String = "";
  subjectFaculty:String = "";
  subjectType:String = "";
  subjectCode:String = "";
  units:any = "";
  flist = new FormControl();

  yearList: any[] = []
  semList: any[] = []
  subjectId: any;
  subjectDetails: any;
  editfaculty:boolean = false;

  constructor(private route:ActivatedRoute,private subjectService:SubjectsService) { }

  ngOnInit( ): void {
    this.subjectId = this.route.snapshot.paramMap.get('subjectid');
    this.subjectService.getSubjectbyId(this.subjectId).subscribe((res)=>{
      this.subjectDetails = res.data;
      this.flist.setValue(this.subjectDetails.faculty.split(",").map((item) => ({"userId":item.split("|")[1],"name":item.split("|")[0]})))
      this.subjectDetails.faculty = this.subjectDetails.faculty.split(",").map((item) => ({"userId":item.split("|")[1],"name":item.split("|")[0]}))
      this.subjectName = res.data.subjectName;
      this.branch = res.data.subjectBranch;
      this.degree = res.data.subjectDegree;
      this.scheme = res.data.subjectScheme;
      this.year = res.data.subjectYear;
      this.semister = res.data.subjectSemister;
      this.units = res.data.subjectUnits;
      this.subjectCode = res.data.subjectCode;
      this.subjectType = res.data.subjectType;
      this.changeDegree(this.degree)
      this.changeYear(this.year)
    })
    this.getfaculty();
  }

  getfaculty(){
    this.subjectService.getFacultyNames().subscribe((res)=>{
      this.faculty = res.data;
    })
  }

  formSubmit(){
    var formData = {'subjectId':this.subjectId,
                    'subjectName':this.subjectName,
                    'subjectDegree':this.degree,
                    'subjectYear':this.year,
                    'subjectBranch':this.branch,
                    'subjectScheme':this.scheme,
                    'subjectSemister':this.semister,
                    'subjectUnits':this.units,
                    'subjectFaculty':this.flist.value.map((a) => a.userId)
                  };

    this.subjectService.updateSubject(formData).subscribe(res=>{
      if(res.sstatus =="error"){
        alert(res.message);
      }
      alert("subject updated");
      this.subjectDetails = res.data;
      this.subjectDetails.faculty = this.subjectDetails.faculty.split(",").map((item) => ({"userId":item.split("|")[1],"name":item.split("|")[0]}))
      this.subjectName = res.data.subjectName;
      this.branch = res.data.subjectBranch;
      this.degree = res.data.subjectDegree;
      this.scheme = res.data.subjectScheme;
      this.year = res.data.subjectYear;
      this.semister = res.data.subjectSemister;
      this.units = res.data.subjectUnits;
      this.flist.setValue(this.subjectDetails.faculty)
    })
  }

  changeDegree(e){
    this.degree = e;
    
    this.yearList = []
    this.semList = []
    
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

  changeYear(e){
    this.year = e;
    console.log(this.semister)
    let year = this.roman_to_Int(this.year)
    this.semList = []
    let y = year+(year-1)
    this.semList.push(this.convert(y))
    this.semList.push(this.convert(y+1))
  }

  changeSem(e){
    this.semister = e.target.value;
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
