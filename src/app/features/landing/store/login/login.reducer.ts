import { createReducer, on } from "@ngrx/store";
import { LoginPageInterface } from "src/app/shared/models/login-page.interface";
import * as fromLoginActions from "./login.action";

const STATE_INITIAL_LOGIN: LoginPageInterface = { error: null, loading: false };

export const loginReducer = createReducer<LoginPageInterface>(
  STATE_INITIAL_LOGIN,
  on(fromLoginActions.signIn, (state) => ({ ...state, loading: true })),
  on(fromLoginActions.finishLoad, (state) => ({ ...state, loading: false })),
  on(fromLoginActions.signInFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
