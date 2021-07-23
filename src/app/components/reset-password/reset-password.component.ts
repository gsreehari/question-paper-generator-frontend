import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  resetForm  = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    // password: new FormControl('',[Validators.required]),
  })

  get email (){
    return this.resetForm.get('email');
  }
  submit(){
  }

}
