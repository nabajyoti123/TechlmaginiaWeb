import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Enquiry } from 'src/app/model/enquiry';
import { EnquiryService } from 'src/app/service/enquiry.service';
import {AfterViewInit, Component,Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { DatePipe } from '@angular/common'
import { catchError, retry, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDailogComponent } from 'src/app/error-dailog/error-dailog.component';
@Component({
  selector: 'app-list-enquiry',
  templateUrl: './list-enquiry.component.html',
  styleUrls: ['./list-enquiry.component.scss']
})

export class ListEnquiryComponent implements OnInit {
  displayedColumns: string[] = [ 'fullName', 'email', 'phoneNo', 'organization', 'subject', 'content'];
  dataSource!: MatTableDataSource<Enquiry>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  enquiries: Enquiry[] = [];
 
  startDate : string;
  endDate : string;
  password: any;
  userName: any;

  
  constructor(private EnquiryService: EnquiryService,
    private router: Router, public dialog: MatDialog) { 
    this.startDate='';
    this.endDate='';
      
    }

  ngOnInit(): void {
   

  
  }
  
  getEnquiryBetweenDate(){
    
    this.EnquiryService.getEnquiryBetweenDate(this.startDate.split("-").reverse().join("-")
    ,this.endDate.split("-").reverse().join("-")).subscribe(data => {
      this.enquiries = data;
      
     
      this.dataSource = new MatTableDataSource( this.enquiries);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.enquiries.length==0){
      const dialogRef = this.dialog.open(ErrorDailogComponent, {
        data: {message: 'No record found',alertType: 'info'},
    }); 
    
  }
    },
    error => {
     
      const dialogRef = this.dialog.open(ErrorDailogComponent, {
        data: {message: 'Error Occured',alertType: 'error'},
    });
    
    }
    )

    

  }
 downloadEnquiryBetweenDate(){
    this.EnquiryService.downloadEnquiryBetweenDate(this.startDate.split("-").reverse().join("-")
    ,this.endDate.split("-").reverse().join("-"))
    
}
ngAfterViewInit() {
 
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage()
  }
  }


}
