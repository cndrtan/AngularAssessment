import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import es from '@angular/common/locales/es';
import { Order } from '../model/order.model';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit{
  
  product: any;
  paramID: any;
  dataOrder: Order[] = []

  constructor(private activateroute: ActivatedRoute, private router: Router, private productService: ProductService){
    this.paramID = activateroute.snapshot.params;
  }
  
  ngOnInit(): void {
    this.productService.getProductbyID(this.paramID.id).subscribe((product:any) => {
      this.product = product;
    });

    if(sessionStorage.getItem('order')){
      this.dataOrder = JSON.parse(sessionStorage.getItem('order')!)
    }

    registerLocaleData( es );
  }

  addToCart(){
    let order: Order = ({
      name: this.product.name,
      price: this.product.price,
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
