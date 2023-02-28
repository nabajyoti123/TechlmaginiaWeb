import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Enquiry } from '../model/enquiry';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDailogComponent } from '../error-dailog/error-dailog.component';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  [x: string]: any;
 //addEmpURL : string;
 
  constructor(private http : HttpClient) {

    
   
  }
  //baseURL="http://localhost:8081/v2/webportal/enquiry";
  baseURL="https://backend-379006.uw.r.appspot.com/v2/webportal/enquiry";

    createEnquiry(Enquiry: Enquiry) {
      let headers= new HttpHeaders({
     //   'Content-Type':  'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
       // 'Access-Control-Allow-Origin': '*'
       'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })


      return this.http.post(this.baseURL + "/create", Enquiry,{headers: headers})
      .pipe(retry(0), catchError(this.handleError));
    }
    getEnquiryBetweenDate(startDate:string,endDate: string):Observable<Enquiry[]>{
     let headers= new HttpHeaders({
      //  'Content-Type':  'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
       // 'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
      })


      let getEmpByDateUrl= this.baseURL +'/betweenDates?startDate='+startDate+'&endDate='+endDate;
      return this.http.get<Enquiry[]>(getEmpByDateUrl,{headers: headers})
      .pipe(retry(0), catchError(this.handleError));

    }

    downloadEnquiryBetweenDate(startDate:string,endDate: string):any{
      let getEmpByDateUrl= this.baseURL +'/downloadBetweenDate?startDate='+startDate+'&endDate='+endDate;
      window.open(getEmpByDateUrl);
  
    }
    handleError(error:any) {
      let errorMessage = '';
     // console.log('===============================error happend========')
  
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    //  if(this.enquiries.length=0) {
       
      return throwError(() => {
          return errorMessage;
      });
     
  }
  getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}
}
