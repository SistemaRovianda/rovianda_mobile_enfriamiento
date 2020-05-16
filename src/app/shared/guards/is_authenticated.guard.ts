import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "../Models/app-state.interface";
import { selectUID } from "src/app/features/landing/store/user/user.selector";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IsAuthenticatedGuard implements CanActivate {
  uid: string;

  constructor(private store: Store<AppStateInterface>) {
    this.store.select(selectUID).subscribe((tempUID) => (this.uid = tempUID));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.uid == null || this.uid == "" ? true : false;
  }
}
