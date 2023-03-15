import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../model/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  
  constructor(private router: Router){}

  dataOrder: Order[] = []
  totalOrder: number = 0;
  
  ngOnInit(): void {
    if (sessionStorage.getItem('order')){
      this.dataOrder = JSON.parse(sessionStorage.getItem('order')!)
    }

    registerLocaleData( es );
    this.totalOrderFunc()
  }

  totalOrderFunc(){
    this.totalOrder = 0
    this.dataOrder.forEach((item) =>{
      this.totalOrder += (item.price! * item.quantity!)
    })
  }

  incrementQty(input: any){
    input.quantity! += 1
    
    let prevData = JSON.parse(sessionStorage.getItem('order')!)
    Object.keys(input).forEach(function(val,key){
      prevData[val] = input[val];
    })
    sessionStorage.setItem('order', JSON.stringify(this.dataOrder))
  }

  decrementQty(input: any){
    if(input.quantity > 1){
      input.quantity! -= 1
    
      let prevData = JSON.parse(sessionStorage.getItem('order')!)
      Object.keys(input).forEach(function(val,key){
        prevData[val] = input[val];
      })
      sessionStorage.setItem('order', JSON.stringify(this.dataOrder))
    }
  }

  deleteOrder(order: Order){
    const index: number = this.dataOrder.findIndex((d) => d.name === order.name);
    const prevQty: number = this.dataOrder[index].quantity!
      
    if (index !== -1) {
      this.dataOrder.splice(index, 1);
    }
    sessionStorage.setItem('order', JSON.stringify(this.dataOrder))
  }

  checkoutClick(){
    this.router.navigate(['checkout']);
  }

}
