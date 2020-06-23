import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/Models/app-state.interface";
import { noWhiteSpace } from "src/app/shared/validators/whitespace.validator";
import { StoreValidators } from "src/app/shared/validators/store.validator";
import {
  SELECT_LOGIN_ERROR,
  SELECT_IS_LOADING,
} from "../../store/login/login.selector";

@Component({
  selector: "app-form-login",
  templateUrl: "./form-login.component.html",
  styleUrls: ["./form-login.component.scss"],
})
export class FormLoginComponent implements OnInit {
  form: FormGroup;

  loading: boolean;

  @Output("onSubmit") submit = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private _store: Store<AppStateInterface>
  ) {
    this.loading = false;
    this.form = this.fb.group(
      {
        email: ["", [Validators.required, Validators.email, noWhiteSpace]],
        password: ["", [Validators.required, noWhiteSpace]],
      },
      {
        asyncValidators: [
          StoreValidators.hasStoreError(
            this._store.select(SELECT_LOGIN_ERROR),
            "loginError"
          ),
        ],
      }
    );
  }

  ngOnInit() {
    this._store
      .select(SELECT_IS_LOADING)
      .subscribe((res) => (this.loading = res));
    this.form.reset();
  }

  translateError(errorMessage: string): string {
    if (
      errorMessage ==
      "There is no user record corresponding to this identifier. The user may have been deleted."
    ) {
      return "Correo no registrado.";
    }
    if (
      errorMessage ==
      "The password is invalid or the user does not have a password."
    ) {
      return "Contraseña invalida.";
    }
    if (errorMessage == "Usuario no valido") {
      return "Usuario no valido";
    }
    return "Varios intentos fallidos, consulte con el administrador o intente mas tarde";
  }

  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }

  onSubmit(): void {
    this.submit.emit(this.form.value); 
  }
}
