import { Component, OnInit ,ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule,NgbCarouselModule, NgIf,],
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {
  transform = [{ height: "10", width: "10" }];
  constructor() { }

  ngOnInit(): void {
  }
	//images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
	images = ['../assets/image1.jpg','../assets/image2.jpg','../assets/image3.jpg','../assets/image4.jpg'];

}