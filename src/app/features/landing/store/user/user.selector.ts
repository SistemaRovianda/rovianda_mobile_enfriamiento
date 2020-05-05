import { AppStateInterface } from "src/app/shared/Models/app-state.interface";
import { createSelector } from "@ngrx/store";

export const SELECT_USER = (state: AppStateInterface) => state.user;

export const selectUID = createSelector(SELECT_USER, (state) => state.uid);
