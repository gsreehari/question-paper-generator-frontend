import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../../services/users/users.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { BranchService } from '../../../../../services/branch/branch.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  username:string = '';
  email:string = '';
  password:string = '';
  branch:string = '';
  role:any = '';
  isChecked:boolean = false;

  Data: Array<any> = [
    { name: 'Admin', value: 2 },
    { name: 'Faculty', value: 3 },
  ];

  branches:[];

  form: FormGroup;


  constructor(private usersService:UsersService,private fb: FormBuilder, private branchService:BranchService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
    this.branchService.getBranches().subscribe((res)=>{
      this.branches = res.data
    })
  }

  formSubmit(){
    var rolelist = this.form;
    var roles = rolelist.value.checkArray.map((item)=>parseInt(item));

    if(this.username === '' || this.email === '' || this.password === '' || roles.length === 0 || this.branch === ''){
      return alert('all fields are required') 
    }
    this.usersService.insertUserIntoDb(this.username,this.email,this.password,this.branch,roles).subscribe((res)=>{
      if(res.code == 'UIS'){
        alert("User added.");
        this.username = '';
        this.password = '';
        this.email = '';
        this.form.value.reset();
        this.isChecked = false;
      }
    })
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onCheckChange(e){
    if (e.checked) {
      this.password = this.username;
    }else{
      this.password = '';
    }
  }

}
