import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../../services/users/users.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId:string = "";
  userData:any;
  currentUser:any;
  editMode:boolean = false;
  checked:any[] = []
  Data: Array<any> = [
    { name: 'Admin', value: '2' },
    { name: 'Faculty', value: '3' },
  ];
  checkArray: FormArray;

  form: FormGroup;

  constructor(private route:ActivatedRoute, private userService:UsersService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.userService.getUserById(this.userId).subscribe((res)=>{
      this.userData = res.data; 
      this.userData.roles.forEach(element => {
        this.checked.push(element.toString());
      });
      this.form = this.fb.group({
        checkArray: this.fb.array(this.checked)
      })
    })
  }

  changeEdit(){
    this.editMode = !this.editMode;
  }

  onCheckboxChange(e) {
    this.checkArray= this.form.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      this.checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    
  }

  onClick(){
    this.userService.updateRoles({
      "userId":this.userId,
      "userRoles":this.checkArray.value.map((item)=>parseInt(item))
    }).subscribe(res=>{
      this.userData = res.data; 
      this.checked = [];
      res.data.roles.forEach(element => {
        this.checked.push(element.toString());
      });
      this.form = this.fb.group({
        checkArray: this.fb.array(this.checked)
      })
      console.log(this.userData.roles)
      console.log(this.checked)
      this.checkArray.clear();
      this.editMode = false
    })
  }

  onChangeStatus(status:number){
    this.userService.updateUserStatus(this.userId, status).subscribe((res)=>{
      this.userData = res.data;
      this.editMode = false;
    })
  }

}
