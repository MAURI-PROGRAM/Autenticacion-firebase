import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private router: Router, private db: AngularFirestore, private googlelus: GooglePlus) {}

  login(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
        console.log(user);
      }).catch(err => rejected(err));
    });
  }

  loginWhitGoogle() {
    return this.googlelus.login({}).then((res) => {
      const userDataGoogle = res;
      return this.AFauth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, userDataGoogle.accesToken));
    });
  }

  logout() {
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  register(email: string, password: string, name: string) {
    console.log(email, password, name);
    return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        console.log(res.user.uid);
        const uid = res.user.uid;
        this.db.collection('users').doc(uid).set({
          name,
          uid
        });

        resolve(res);
      }).catch(err => reject(err));
    });
  }

  resetPassword(email: string) {
    return this.AFauth.auth.sendPasswordResetEmail(email);
  }


}
