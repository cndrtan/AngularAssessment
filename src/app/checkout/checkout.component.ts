import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../model/order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  dataOrder: Order[] = []
  totalOrder: number = 0

  ngOnInit(): void {

    if(sessionStorage.getItem('order')){
      this.dataOrder = JSON.parse(sessionStorage.getItem('order')!)
    }

    registerLocaleData( es );
    this.totalOrderFunc();
  }

  totalOrderFunc(){
    this.totalOrder = 0
    this.dataOrder.forEach((item) =>{
      this.totalOrder += (item.price! * item.quantity!)
    })
  }

  reactForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(12), Validators.pattern("^[0-9]*$")]),
    address: new FormControl('', [Validators.required, Validators.maxLength(250)])
  });

  get getNameValue(){
    return this.reactForm.get('name');
  }
  get getEmailValue(){
    return this.reactForm.get('email');
  }
  get getPhoneValue(){
    return this.reactForm.get('phone');
  }
  get getAddressValue(){
    return this.reactForm.get('address');
  }

  onSubmit(){
    sessionStorage.clear()
    alert("Thank you for your order!")
  }

}
