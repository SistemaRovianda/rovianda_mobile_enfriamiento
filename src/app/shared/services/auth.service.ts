import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, from, throwError } from "rxjs";
import { UserInterface } from "../Models/user.interface";

import * as firebase from "firebase/app";
import "firebase/auth";
import Auth = firebase.auth.Auth;
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  auth: Auth;
  API;

  constructor(private http: HttpClient, private router: Router) {
    firebase.initializeApp({
      apiKey: "AIzaSyDaoKnC-MSM0b069pawJ5KI1eWlbmng99o",
      authDomain: "rovianda-88249.firebaseapp.com",
    });

    this.auth = firebase.auth();
    this.API = `${environment.basePath}/`;
  }

  userFake: UserInterface = {
    email: "rovianda@gmail.com",
    password: "Rovianda#.123",
    token: "hddskskeokjghskskdn",
    role: "admi",
    uid: "ururjdjsjsjjslanldenimw",
    type: "user",
  };

  signIn(email: string, password: string): Observable<any> {

    return from(
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) =>
          Promise.all([
            Promise.resolve(userCredentials.user.uid),
            Promise.resolve(userCredentials.user.refreshToken),
          ])
        )
        .catch()
    ).pipe(map(([uid, token]) => ({ uid, token })));
  }

  getTokenCurrentUser(): Observable<any> {
    return from(
      this.auth.currentUser.getIdToken().then((res) => {
        return Promise.all([Promise.resolve(res)]);
      })
    ).pipe(map(([currentToken]) => ({ currentToken })));
  }

  getUserData(uid: string): Observable<UserInterface> {
    //return this.http.get<UserInterface>(`${this.API}/${uid}`);

    return new Observable((observer) => {
      observer.next(this.userFake);
      observer.complete();
    });
  }

  signOut(): Observable<any> | null {
    return from(
      this.auth.signOut().then((_) => {
        this.router.navigate(["/login"], { replaceUrl: true });
      })
    );
  }
}
