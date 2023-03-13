import { Component } from '@angular/core';
import { SlideInterface } from '../carousel/slide.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  
  //for carousell
  slides: SlideInterface[] = [
    { url: '/assets/picture1.jpg', title: 'shoes' },
    { url: '/assets/picture2.jpg', title: 'bag' },
    { url: '/assets/picture3.jpg', title: 'shirt' }
  ];
  
}
