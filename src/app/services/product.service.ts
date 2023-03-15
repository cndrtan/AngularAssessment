import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  product: Product[] = []

  base_url = "http://localhost:3000/products"

  getProduct(){
    return this.http.get(this.base_url);
  }

  getProductbyID(id:number){
    return this.http.get(this.base_url + `/${id}`)
  }
}
