import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { 
  }

  create(product: unknown) {
    return this.db.list('/products').push(product).key;
  }

  getAll() {
    return this.db.list('/products')
  }

  getProduct(productId: string) {
    return this.db.object('/products/' + productId);
  }

  updateProduct(productId: string, product: Partial<unknown>) {
    return this.db.object('/products/' + productId).update(product);
  }

  deleteProduct(productId: string | null) {
    return this.db.object('/products/' + productId).remove();
  }
}
