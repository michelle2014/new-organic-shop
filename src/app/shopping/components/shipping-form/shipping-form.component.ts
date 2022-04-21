import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input ('cart') cart!: ShoppingCart;
  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  };
  userSubscription!: Subscription;
  userId!: string;

  constructor(
    private route: Router,
    private authService: AuthService,
    private orderService: OrderService,
   ) { }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user!.uid);
  }

  ngOnDestroy () {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    console.log(this.shipping);
    // order is different from shopping cart, one is an array, the other is a map
    let order = new Order(this.userId, this.shipping, this.cart);
    // it is possible that the second line (for clearing the cart) 
    // fails for some unexpected reason while connecting with Firebase.
    // A more reliable approach is to have a transaction?
    let result = await this.orderService.placeOrder(order);
    this.route.navigate(['/order-success', result.key]);
  }

}
