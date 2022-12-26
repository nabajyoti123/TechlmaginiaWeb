import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/service/auth.service';
import { EnquiryService } from 'src/app/service/enquiry.service';
import { ImageSliderComponent } from "../../image-slider/image-slider.component";

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private title : Title,private empService : EnquiryService
   , private authService:AuthService, ) { 
    this.title.setTitle('arbitrary - home');
  }

  ngOnInit(): void {
    this.authService.isAuthenticated=false;
  }

}
