import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from "@angular/common/http";
import { AppStateInterface } from "../Models/app-state.interface";
import { Store } from "@ngrx/store";
import { selectCurrentToken } from "src/app/features/landing/store/user/user.selector";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
  token: string;

  constructor(private store: Store<AppStateInterface>) {
    this.store
      .select(selectCurrentToken)
      .subscribe((tempToken) => (this.token = tempToken));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this.token || "");

    if (this.token != "" || this.token != null) {
      request = req.clone({
        headers,
      });
    }
    return next.handle(request);
  }
}
