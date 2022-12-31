import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { EnquiryService } from '../service/enquiry.service';

export interface DialogData {
  userName: string;
  password: string;
}
@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './signIn-dailog.component.html',
  styleUrls: ['./signIn-dailog.component.scss']
})
export class SignInDialogComponent implements OnInit {
  userName!: string;
  password!: string;
    constructor(
    public dialogRef: MatDialogRef<SignInDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,private empService : EnquiryService,
    private authService:AuthService, 
  ) {
   // this.userName=data.userName
   // this.password=data.password
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  loginAndRedirect(){
    //alert(this.userName)
    
    if(this.userName=='admin'&&this.password=='testpass'){
      //alert(2)
      this.authService.isAuthenticated=true;
      if( this.authService.isAuthenticated==true){
      this.router.navigateByUrl('/listEnquiry');
    
      }
    }
  }

}
