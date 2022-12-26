import { NgFor } from '@angular/common';
import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDailogComponent } from 'src/app/error-dailog/error-dailog.component';
import { Enquiry } from 'src/app/model/enquiry';
import { EnquiryService } from 'src/app/service/enquiry.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-contact-us',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

register =new FormGroup({
  uname: new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')]),
  email: new FormControl("",[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
  number: new FormControl("",[ Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  organization: new FormControl("",Validators.required),
  subject: new FormControl("",Validators.required),
  content: new FormControl("",Validators.required)
});

  Enquiry: Enquiry = new Enquiry();
  showAlert = false;
  constructor(private empService : EnquiryService,private router: Router,public dialog: MatDialog,
    private authService:AuthService, ) { 
 
  }
  ngOnInit(): void {
    this.authService.isAuthenticated=false;
  }
  closeAlert() {
    this.showAlert = false;
  }
  saveStudent() {
    this.empService.createEnquiry(this.Enquiry).subscribe((response) => {
      console.log(response);
      this.showAlert = true;
      this.Enquiry = new Enquiry();
      const dialogRef = this.dialog.open(ErrorDailogComponent, {
        data: {message: 'Saved successfully',alertType: 'info'},
    });
    
  },

    error => {
     
      const dialogRef = this.dialog.open(ErrorDailogComponent, {
        data: {message: 'Error Occured',alertType: 'error'},
    });
    
    }
    )
}
onSubmit(){
  console.log(this.Enquiry);
  this.saveStudent();
 console.log(this.register.value)
}

get vname(){
  return this.register.get("uname");
}
get vemail(){
  return this.register.get("email");
}
get vnumber(){
  return this.register.get("number");
}
get vorganization(){
  return this.register.get("organization");
}
get vsubject(){
  return this.register.get("subject");
}
get vcontent(){
  return this.register.get("content");
}


}
