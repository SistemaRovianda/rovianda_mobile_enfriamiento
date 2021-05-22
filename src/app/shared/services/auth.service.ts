import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, from } from "rxjs";
import { UserInterface } from "../models/user.interface";

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
      apiKey: "AIzaSyDtp99_k4WaCJWR8d4FncfRpkA4sJTt23c",
      authDomain: "sistema-rovianda.firebaseapp.com",
      /*apiKey: "AIzaSyDaoKnC-MSM0b069pawJ5KI1eWlbmng99o",
      authDomain: "rovianda-88249.firebaseapp.com",*/
    });

    this.auth = firebase.auth();
    this.API = `${environment.basePath}`;
  }

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

  isAuth() {
    return (
      localStorage.getItem("token") != null &&
      localStorage.getItem("rol") == "COOLING"
    );
  }

  getUserData(uid: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.API}/user/${uid}`);
  }

  signOut(): Observable<any> | null {
    localStorage.clear();
    return from(
      this.auth.signOut().then((_) => {
        this.router.navigate(["/login"], { replaceUrl: true });
      })
    );
  }
}
