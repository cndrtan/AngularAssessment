import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../model/category.model';
import { Product } from '../model/product.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{
  constructor(private categoryService: CategoryService){}
  
  categoryList: Category[] = []

  @Input() product:Product[] = [];

  @Output() filteredProduct = new EventEmitter();

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe((category:any) => {
      this.categoryList = category;
    });
  }

  getFilterValue(input: string){
    return this.product.filter(s => s.category === input).length
  }

  clickFilter(input:string){
    this.filteredProduct.emit(input);
    // this.filteredProduct.emit(this.product.filter(s => s.category === input));
  }
}
