import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of as ObservableOf } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, doc } from '@angular/fire/firestore';
// import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public uid = this.afAuth.authState.pipe(
    map(authState => {
      if(!authState) {
        return null;
      } else {
        return authState.uid;
      };
    })
  );

  public isAdmin: Observable<boolean> = this.uid.pipe(
    switchMap(uid => {
      if(!uid) {
        return ObservableOf(false);
      } else {
        let docRef = doc(this.fs, 'Admins/'+uid);
        console.log(docRef.id);
        console.log(docRef.id != uid);
        if(docRef.id != uid) {
          return ObservableOf(false);
        } else {
          return ObservableOf(true);
        }
        //return this.db.object<boolean>('/admin/' + uid).valueChanges();
      }
    }),map(value => !!value)
  );

  constructor(private afAuth: AngularFireAuth, private fs: Firestore) {}

  registerWithEmailAndPassword(user: {email: string, password: string}) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  signInWithEmailAndPassword(user: {email: string, password: string}) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afAuth.signOut();
  }
}
