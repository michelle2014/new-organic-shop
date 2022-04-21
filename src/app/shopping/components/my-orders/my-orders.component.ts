import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orders$: any;

  constructor(private authService: AuthService, private orderService: OrderService) {
    this.orders$ = authService.user$.pipe(switchMap(async (u) => orderService.getOrdersByUser(u!.uid)));
   }

}
