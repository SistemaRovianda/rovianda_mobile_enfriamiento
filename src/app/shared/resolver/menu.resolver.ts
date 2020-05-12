import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "../Models/app-state.interface";
import * as fromMenuActions from "src/app/features/menu/store/menu/menu.actions";
import * as fromStepperActions from "src/app/features/menu/store/stepper/stepper.actions";

@Injectable()
export class MenuResolver implements Resolve<boolean> {
  constructor(private store: Store<AppStateInterface>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(fromMenuActions.menuStartLoad());
    this.store.dispatch(fromStepperActions.stepperInit());
    return true;
  }
}
