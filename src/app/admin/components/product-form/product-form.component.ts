import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { switchMap } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
// whenever only take one from Observable but don't want to unsubscribe, use take
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: any; 
  productKey?: string | null;
  product: any = {}; 
  id: string | null;
  
  constructor(
    private router: Router,
    categoryService: CategoryService, 
    private productService: ProductService,
    private route: ActivatedRoute,
    private db: AngularFireDatabase) { 
    this.categories$ = categoryService.getCategories().snapshotChanges();
    console.log('categories' + this.categories$.subscribe((x: any) => console.log(x)));
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    if (this.id) this.productService.getProduct(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);
  }

  ngOnInit(): void {
  } 

  save(product: any) {
    console.log(this.id);
    if (this.id) this.productService.updateProduct(this.id, product);
    else {
    this.productKey = this.productService.create(product);
    console.log(product['title']);
    this.db.object('/products/' + this.productKey).update(
    {
      category: product['category'],
      imageUrl: product['imageUrl'],
      price: product['price'],
      title: product['title'],
      id: this.productKey,
    })
    console.log(product);}
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you share you want to delete this product?')) return;

    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products'])
    console.log('deleted');
  }

}