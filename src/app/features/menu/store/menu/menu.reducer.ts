import { MenuInterface } from "src/app/shared/models/menu.interface";
import { createReducer, on } from "@ngrx/store";
import * as fromMenuActions from "./menu.actions";

const STATE_INITIAL_MENU: MenuInterface = {
  lots: [],
  products: [],
  loading: false,
  error: null,
};

export const menuReducer = createReducer(
  STATE_INITIAL_MENU,
  on(fromMenuActions.menuStartLoad, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromMenuActions.menuFinisLoad, (state) => ({
    ...state,
    loading: false,
  })),
  on(fromMenuActions.menuFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(fromMenuActions.menuLoadLots, (state, { lots }) => ({
    ...state,
    lots,
  })),
  on(fromMenuActions.menuSelectLot, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromMenuActions.menuLoadProducts, (state, { products }) => ({
    ...state,
    products,
  }))
);
