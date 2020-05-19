import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "../Models/app-state.interface";
import * as fromMenuActions from "src/app/features/menu/store/menu/menu.actions";

@Injectable()
export class LotsResolver implements Resolve<boolean> {
  constructor(private store: Store<AppStateInterface>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(
      fromMenuActions.menuStartLoad({ status: route.data.status })
    );
    return true;
  }
}
