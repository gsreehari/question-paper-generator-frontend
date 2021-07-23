import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../../../services/branch/branch.service';

@Component({
  selector: 'app-addbranch',
  templateUrl: './addbranch.component.html',
  styleUrls: ['./addbranch.component.css']
})
export class AddbranchComponent implements OnInit {

  degree: string = "";
  branchName: string = "";

  constructor(private branchService:BranchService) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.branchName === ""){
      alert("please enter branch name")
      return;
    }
    if(this.degree === 'so' || this.degree === '' ){
      alert("please select the degree")
      return;
    }    
    var data = {}
    data['branchName'] = this.branchName
    data['branchDegree'] = this.degree

    this.branchService.addBranch(data)
    .subscribe((res)=>{
      alert(res.message)
    })
  }

  changeDegree(e){
    this.degree = e.target.value;
    console.log(this.degree)
  }

}
