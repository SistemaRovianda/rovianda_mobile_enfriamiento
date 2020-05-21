import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { emailValidator } from "src/app/shared/validators/email.validator";
import { passwordValidator } from "src/app/shared/validators/password.validator";
import { StoreValidators } from "src/app/shared/validators/store.validator";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import {
  SELECT_LOGIN_ERROR,
  SELECT_IS_LOADING,
} from "../../store/login/login.selector";

import * as fromLoginActions from "../../store/login/login.action";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {}

  loginForm = this.fb.group(
    {
      email: ["", [Validators.required, emailValidator]],
      password: ["", [Validators.required]],
    },
    {
      asyncValidators: [
        StoreValidators.hasStoreError(
          this.store.select(SELECT_LOGIN_ERROR),
          "loginError"
        ),
      ],
    }
  );

  loading: boolean;

  ngOnInit() {
    this.store
      .select(SELECT_IS_LOADING)
      .subscribe((tempLoading) => (this.loading = tempLoading));
  }

  onLogin() {
    this.store.dispatch(fromLoginActions.signIn(this.loginForm.value));
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  translateErrorMessageByFirebase(value: string) {
    if (
      value == "The password is invalid or the user does not have a password."
    )
      return "La contraseña es incorrecta";
    if (
      value ==
      "There is no user record corresponding to this identifier. The user may have been deleted."
    )
      return "El correo electrónico no existe.";
    if (value == "No autorizado") return "Usuario no valido para el sistema";
    return "Varios intentos fallidos, volver a intentarlo mas tarde o consultarlo con el administrador del sistema";
  }
}
