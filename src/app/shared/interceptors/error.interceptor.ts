import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "../Models/app-state.interface";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { signOut } from "src/app/features/landing/store/login/login.action";

@Injectable({ providedIn: "root" })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppStateInterface>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("llame interceptor ")
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.store.dispatch(signOut);
          location.reload(true);
        }
        const err = error.error.message || error.statusText;
        return throwError(err);
      })
    );
  }
}
