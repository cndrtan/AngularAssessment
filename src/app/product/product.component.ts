import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SlideInterface } from '../carousel/slide.interface';
import { Order } from '../model/order.model';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  
  constructor(private router: Router, private productService: ProductService){}

  @Input() categories:any;

  productList: Product[] = []

  ngOnInit(): void {
    //to get product list when first open
    this.productService.getProduct().subscribe((product:any) => {
      this.productList = product;
      console.log(product);
    });

    if (sessionStorage.getItem('order')){
      this.dataOrder = JSON.parse(sessionStorage.getItem('order')!)
    }
  }

  viewDetails(input: Product){
    if (input) {
      this.router.navigate(['details', input.id]);
    }
  }

  filterCat: string = 'All';

  filteredProduct(input: string){
    this.filterCat = input;
  }
  
  //for carousell
  slides: SlideInterface[] = [
    { url: '/assets/picture1.jpg', title: 'shoes' },
    { url: '/assets/picture2.jpg', title: 'bag' },
    { url: '/assets/picture3.jpg', title: 'shirt' }
  ];
  
  dataOrder: Order[] = []

  addToCart(input:Product){
    let order: Order = ({
      name: input.name,
      price: input.price,
      quantity: 1
    }) 

    if(this.dataOrder.findIndex((d) => d.name === order.name) < 0){
      this.dataOrder.push(order)
    }else{
      const index: number = this.dataOrder.findIndex((d) => d.name === order.name);
      const prevQty: number = this.dataOrder[index].quantity!
      
      if (index !== -1) {
          this.dataOrder.splice(index, 1);
      }  
      
      order.quantity! = prevQty + 1
      this.dataOrder.push(order)
    } 
    sessionStorage.setItem('order', JSON.stringify(this.dataOrder))
  }
}
