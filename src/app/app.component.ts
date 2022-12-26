import { Component, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import {MatDialog} from '@angular/material/dialog';
import { SignInDialogComponent } from './signIn-dailog/signIn-dailog.component';
import { Enquiry } from './model/enquiry';

export interface DialogData {
  userName: string;
  password: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userName!: string;
  password!: string;
  enquiries: Enquiry[] = [];
  openDialog(): void {
    const dialogRef = this.dialog.open(SignInDialogComponent, {
      data: {name: this.password, animal: this.userName},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.userName = result;
    });
  }
  currentYear : number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
    this.currentYear = new Date().getFullYear();
  }

 handleDrawerClick(drawer : MatSidenav) {
  if (drawer.mode == 'over') drawer.close();
  }

}
