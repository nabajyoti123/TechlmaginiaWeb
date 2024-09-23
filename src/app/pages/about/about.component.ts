import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/service/auth.service';
import { EnquiryService } from 'src/app/service/enquiry.service';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private title : Title,private empService : EnquiryService, private authService:AuthService, ) { 
    this.title.setTitle('Techlmaginia Softwares');
  }

  ngOnInit(): void {
    this.authService.isAuthenticated=false;
  }

}
