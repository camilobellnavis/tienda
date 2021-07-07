import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public auth: AngularFireAuth) {
    this.getUid();
   }

  public login(email: string, pass: string){
    return this.auth.signInWithEmailAndPassword(email,pass);
  }

  public logout() {
    return this.auth.signOut();
  }

  public registrar(email: string, pass: string){
    return this.auth.createUserWithEmailAndPassword(email,pass);
  }

  async getUid(){
    const user = await this.auth.currentUser;
    if(user === null){
      return null;
    }
    else{
      return user.uid;
    }
  }

  stateAuth(){
   return this.auth.authState;
  }
}
