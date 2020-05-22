import { AppStateInterface } from "src/app/shared/Models/app-state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_MENU = (state: AppStateInterface) => state.menu;

export const SELECT_MENU_LOADING = createSelector(
  SELECT_MENU,
  (state) => state.loading
);

export const SELECT_MENU_LOTS = createSelector(
  SELECT_MENU,
  (state) => state.lots
);

export const SELECT_MENU_PRODUCTS = createSelector(
  SELECT_MENU,
  (state) => state.products
);

export const SELECT_MENU_FRIDGES = createSelector(
  SELECT_MENU,
  (state) => state.fridges
);
