import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService) { }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges().subscribe(x => {console.log(x)});
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }

  async placeOrder(order: Object) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
}
