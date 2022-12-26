import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  message: string;
  alertType: string;
}
@Component({
  selector: 'app-error-dailog',
  templateUrl: './error-dailog.component.html',
  styleUrls: ['./error-dailog.component.scss']
})
export class ErrorDailogComponent implements OnInit {

  message!: string;
  alertType!: string;
  
    constructor(
    public dialogRef: MatDialogRef<ErrorDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.message=data.message;
    this.alertType=data.alertType;
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }


}
