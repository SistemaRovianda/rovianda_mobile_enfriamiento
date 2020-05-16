import { AppStateInterface } from "src/app/shared/Models/app-state.interface";
import { createSelector } from "@ngrx/store";

export const SELECT_USER = (state: AppStateInterface) => state.user;

export const selectUID = createSelector(SELECT_USER, (state) => state.uid);

export const selectCurrentToken = createSelector(
  SELECT_USER,
  (state) => state.currentToken
);

export const selectRole = createSelector(SELECT_USER, (state) => state.role);
