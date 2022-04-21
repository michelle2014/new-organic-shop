import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Product } from 'shared/models/product';
import { map, Observable, take } from 'rxjs';
import { ProductService } from './product.service';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase, private productService: ProductService) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cardId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cardId).valueChanges()
      .pipe(map((x: any) => new ShoppingCart(x.items)));
  }

  private async getOrCreateCartId(): Promise<any> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId!;
      
    let result = await this.create();
    localStorage.setItem('cartId', result.key!);
    return result.key!;
  }

  async addToCart(product: Product) {
    this.updateQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateQuantity(product, -1);
  }

  private async updateQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();

    let item$: Observable<any> = this.db.object('/shopping-carts/' + cartId +'/items/' + product.id).valueChanges();

    let item$$ = this.getItem(cartId, product.id)

    item$.pipe(take(1)).subscribe( item => {

      if (item === null) {
        item$$.set({ product: product, quantity: 1 });
        console.log('adding new product to cart');
      } else {
        console.log(item)
        item$$.update({ quantity: item.quantity + change });
        console.log('updating existing product');
      }
      // Or no if else, just the line below
      // item$$.update({ 
        // title: product.title, 
        // imageUrl: product.imageUrl,
        // price: product.price,
        // quantity: (item.quantity || 0) + 1 })
    });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }
}
