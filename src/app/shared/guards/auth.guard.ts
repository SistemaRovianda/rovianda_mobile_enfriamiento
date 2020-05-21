import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "../Models/app-state.interface";
import {
  selectUID,
  selectCurrentToken,
  selectRole,
} from "src/app/features/landing/store/user/user.selector";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../Services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  uid: string;

  token: string;

  role: string;

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private _authService: AuthService
  ) {
    this.store.select(selectUID).subscribe((tempUID) => (this.uid = tempUID));
    this.store
      .select(selectCurrentToken)
      .subscribe((tempToken) => (this.token = tempToken));
    this.store
      .select(selectRole)
      .subscribe((tempRole) => (this.role = tempRole));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if (this.uid != "" && this.uid != null)
    //   if (this.token != "" && this.token != null)
    //     if (this.role != "" && this.role != null && this.role == "Enfriamiento") return true;
    if (this._authService.isAuth()) {
      return true;
    }

    this.router.navigate(["/login"]);
    return true;
  }
}
