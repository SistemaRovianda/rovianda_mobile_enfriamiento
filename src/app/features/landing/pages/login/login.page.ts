import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { StoreValidators } from "src/app/shared/validators/store.validator";
import { Store } from "@ngrx/store";
import { AppStateInterface, SignIn } from "src/app/shared/models/app-state.interface";
import {
  SELECT_LOGIN_ERROR,
  SELECT_IS_LOADING,
} from "../../store/login/login.selector";

import * as fromLoginActions from "../../store/login/login.action";
import { noWhiteSpace } from "src/app/shared/validators/whitespace.validator";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(
    private store: Store<AppStateInterface>
  ) {}

  loading: boolean;

  ngOnInit() {
    this.store
      .select(SELECT_IS_LOADING)
      .subscribe((tempLoading) => (this.loading = tempLoading));
  }

  onLogin(payLoad: SignIn) {
    this.store.dispatch(fromLoginActions.signIn(payLoad));
  }
}
