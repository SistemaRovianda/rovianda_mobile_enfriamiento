import { AppStateInterface } from "src/app/shared/Models/app-state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_LOGIN = (state: AppStateInterface) => state.login;

export const SELECT_IS_LOADING = createSelector(
  SELECT_LOGIN,
  (state) => state.loading
);

export const SELECT_LOGIN_ERROR = createSelector(
  SELECT_LOGIN,
  (state) => state.error
);
