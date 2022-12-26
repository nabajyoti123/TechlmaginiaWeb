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
    this.title.setTitle('arbitrary - products');
  }

  ngOnInit(): void {
    this.authService.isAuthenticated=false
    this.productionProds = [
      {
        name: 'autohome',
        desc: `a mobile or website controlled device to automate home electrical appliances`,
        logoURL : '',
        repoURL : '',
        prodURL : '',
        license : 'GPL-3.0',
        font    : 'Cairo',
      }
    ]

    this.devProds = [
      {
        name: 'autohome',
        desc: `a mobile or website controlled device to automate home electrical appliances`,
        logoURL : '',
        repoURL : 'https://github.com/arbitrarydot/copilot',
        prodURL : '',
        license : '',
        font    : 'ABeeZee', 
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
