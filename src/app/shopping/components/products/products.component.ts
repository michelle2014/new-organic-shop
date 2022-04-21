import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, Subscription, Observable } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts!: any[];
  category!: string | null;
  cart$!: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) { 
  }

  async ngOnInit() {
    this.cart$ = await this. shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    
    this.productService.getAll().valueChanges()
    .pipe(switchMap(products => {
      this.products = products;
      return this.route.queryParamMap
      }))

      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category && this.products) ? 
    this.products.filter(p => p.category === this.category) : 
    this.products;
  console.log(this.filteredProducts);
  }
}
