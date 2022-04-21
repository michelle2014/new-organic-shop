import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { filter, map, Observable, of, pipe, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute, 
    private userService: UserService) { 
    this.user$ = afAuth.authState;   
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() { this.afAuth.signOut(); }

  get appUser$() : Observable<AppUser> {
    return this.user$
      .pipe(switchMap(user => {
        if (user) {
          return this.userService.get(user.uid);}

        else {return of(null)};
      }))  
  }
}
