import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-questionpaperdata',
  templateUrl: './questionpaperdata.component.html',
  styleUrls: ['./questionpaperdata.component.css']
})
export class QuestionpaperdataComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<QuestionpaperdataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
