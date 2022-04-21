import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { Sort } from '@angular/material/sort';

/**
 * @title Sorting overview
 */
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products!: any[];
  filteredProducts!: any[];
  subscription!: Subscription;
  items: Product[] = [];
  itemCount!: number;
  sortedProducts!: any[];

  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll().valueChanges().subscribe(products => {
      this.sortedProducts = this.filteredProducts = this.products = products;
    });
    if (this.sortedProducts) this.sortedProducts = this.products.slice();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  filter(query: string) {
    console.log('query');
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
      console.log(this.products);
  }

  sortData(sort: Sort) {
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedProducts = data;
      return;
    }

    this.sortedProducts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
