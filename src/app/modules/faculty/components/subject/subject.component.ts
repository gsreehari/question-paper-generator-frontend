import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../../services/question/question.service';
import * as XLSX from 'xlsx';
import { LoaderService } from '../../../../services/loader/loader.service'

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subject:any;
  user:any;
  fileToUpload: File = null;
  question:string = '';
  unit:any = '';
  marks:any = '';
  unitsArray:any[] = [];
  inputType:number;
  target : DataTransfer

  constructor(public loadingService:LoaderService,private questionService:QuestionService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.subject.subjectUnits % 2 === 1){
      for(let i=1;i<=this.subject.subjectUnits;i++){
        if(i === Math.ceil(this.subject.subjectUnits/2)){
          this.unitsArray.push({value:i,text:`${i}.1`});
          this.unitsArray.push({value:i+1,text:`${i}.2`});
        }
        else if(i > Math.ceil(this.subject.subjectUnits/2)){
          this.unitsArray.push({
            value:i+1,
            text:i
          });
        }
        else{
          this.unitsArray.push({
            value:i,
            text:i
          });
        }
      }
    }else{
      for(let i=1;i<=this.subject.subjectUnits;i++){
        this.unitsArray.push({
          value:i,
          text:i
        });
      }
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  submit(){
    if(this.question === '' || this.unit === '' || this.marks === ''){
      return alert('All fields are required')
    }
    var formdata = new FormData();
    formdata.append('question',this.question);
    if(this.fileToUpload){
      formdata.append('file',this.fileToUpload);
    }else{
      formdata.append('file','');
    }
    formdata.append('unit',this.unit);
    formdata.append('subjectId',this.subject.subjectId);
    formdata.append('userId',this.user.userId);
    formdata.append('questionmarks',this.marks);
    formdata.append('collegeId','64560');
    this.questionService.insertQuestion(formdata).subscribe((res)=>{
      alert(res.message)
    })
  }

  onFileChange(evt: any) {
    this.target =  <DataTransfer>(evt.target);
    if (this.target.files.length !== 1) throw new Error('Cannot use multiple files');
    
  }

  submitExcel(){
    this.loadingService.isLoading.next(true);
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(this.target.files[0]);
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname : string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      var data:any[] = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      data[0] = [];
      data = data.filter((item:any[])=>{
        return item.length > 0; 
      })
      data.forEach(item=>{
          item[1] = item[1].toString() === `${Math.ceil(this.subject.subjectUnits/2)}.1` ? Math.ceil(this.subject.subjectUnits/2) : item[1].toString() === `${Math.ceil(this.subject.subjectUnits/2)}.2` ? Math.ceil(this.subject.subjectUnits/2)+1 : item[1] > Math.ceil(this.subject.subjectUnits/2) ? item[1]+1 : item[1]
          item.push(null) // 3.image
          item.push(this.user.userId); // 4
          item.push(this.subject.subjectId); // 5
          item.push(this.user.collegeId); // 6
        })
      this.questionService.insertQuestionFromExcel(data).subscribe((res)=>{
        this.loadingService.isLoading.next(false);
        alert(res.message)
      })
    };
  }


  changeInputType(num:number){
    this.inputType = num;
  }

}
