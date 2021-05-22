import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "../models/app-state.interface";
import * as fromStepperActions from "src/app/features/menu/store/stepper/stepper.actions";
import { menuStartLoad } from 'src/app/features/menu/store/menu/menu.actions';

@Injectable()
export class MenuResolver implements Resolve<boolean> {
  constructor(private store: Store<AppStateInterface>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(fromStepperActions.stepperInit());
    this.store.dispatch(menuStartLoad());
    return true;
  }
}
