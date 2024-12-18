import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/service/auth.service';
import { EnquiryService } from 'src/app/service/enquiry.service';

interface Product {
  name : string,    // product name
  desc : string,    // product description
  logoURL : string, // logo (if applicable)
  repoURL : string, // repository URL
  prodURL : string, // production URL (if applicable)
  license : string, // license (if applicable)
  font    : string, // font for title (if applicable)
}
@Component({
  selector: 'app-products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productionProds: Product[] = [];
  devProds: Product[] = []; 

  constructor(private title : Title,private empService : EnquiryService, private authService:AuthService, ) { 
    this.title.setTitle('Techlmaginia Softwares');
  }

  ngOnInit(): void {
    this.authService.isAuthenticated=false
    this.productionProds = [
      {
        name: 'PayingGuest',
        desc: `a website to find a Pg/Hostel By Tenants.
        Even Pg owners can store Tenants Info and documents here for easy access .`,
        logoURL : 'my-pg.in',
        repoURL : '',
        prodURL : 'my-pg.in',
        license : 'GPL-3.0',
        font    : 'Cairo',
      },
      {
        name: 'Tools-ai',
        desc: `All latest ai tools available here . like extracting context from image to pdf/docx .`,
        logoURL : 'https://toolsai-app.web.app/client/img2pdf',
        repoURL : '',
        prodURL : 'https://toolsai-app.web.app/client/img2pdf',
        license : 'GPL-3.0',
        font    : 'Cairo',
      }
    ]

    this.devProds = [
      {
        name: 'Colours Wager',
        desc: `a website to bid & play with colours . win and take money .`,
        logoURL : '',
        repoURL : '',
        prodURL : 'colours-wager.web.app',
        license : '',
        font    : 'ABeeZee', 
      },
      {
        name: 'WeStream',
        desc: `People can buy datapacks for satelite phones (Available in Europe & USA)`,
        logoURL : 'https://test-portal.we.stream/data-plans',
        repoURL : '',
        prodURL : 'https://test-portal.we.stream/data-plans',
        license : 'GPL-3.0',
        font    : 'Cairo',
      }/*,
      {
        name: 'testla',
        desc: `a dummy Tesla API server for testing your 3rd-party Tesla applications.`,
        logoURL : null,
        repoURL : 'https://github.com/arbitrarydot/testla',
        prodURL : null,
        license : null,
        font    : null,
      },
      {
        name: 'tsla',
        desc: `a typescript wrapper for the official Teala REST API.`,
        logoURL : null,
        repoURL : 'https://github.com/arbitrarydot/tsla',
        prodURL : null,
        license : null,
        font    : null,
      },*/

    ]


  }

}
