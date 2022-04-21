import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    // don't really need to unsubscribe here coz it's the root component
    // for other components, memory leaks occur if not unsubscribe
    auth.user$.subscribe(user => {
      if (!user) return;
        userService.save(user);
        
        let returnUrl = localStorage.getItem('returnUrl') as string;
        if (!returnUrl) return;

        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
    })
  }
}
