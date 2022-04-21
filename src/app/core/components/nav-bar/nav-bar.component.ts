import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  appUser!: AppUser; 
  cart$!: Observable<ShoppingCart | null>;

  constructor(
    private auth: AuthService, 
    private shoppingCartService: ShoppingCartService) {
    
    // always unsubscribe auth coz firebase async is difference http service
    // which automatically unsubscribe afterwards
    /* afAuth.authState.subscribe(user => {
      console.log(user);
      this.user = user;
    }); */
    // this.user$ = afAuth.authState;
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {this.auth.logout()}

}
