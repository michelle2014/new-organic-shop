import { Injectable } from '@angular/core';
import { AngularFireDatabase,  } from '@angular/fire/compat/database';
import { AngularFireObject} from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { AppUser } from 'shared/models/app-user'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      isAdmin: true
    })
  }

  get(uid: string): Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
  }
}

