import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  category: Category[] = []

  base_url = "http://localhost:3000/categories"

  getCategory(){
    return this.http.get(this.base_url);
  }
}
