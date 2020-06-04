import { MenuInterface } from "src/app/shared/models/menu.interface";
import { createReducer, on, State } from "@ngrx/store";
import * as fromMenuActions from "./menu.actions";
import * as fromOpenLotActions from "../open-lot/open-lot.actions";
import * as fromCloseLotActions from "../close-lot/close-lot.actions";

const STATE_INITIAL_MENU: MenuInterface = {
  lots: [],
  products: [],
  fridges: [],
  loading: false,
  error: null,
};

export const menuReducer = createReducer(
  STATE_INITIAL_MENU,
  on(fromMenuActions.menuStartLoad, (state) => ({
    ...state,
    loading: true,
    lots: [],
  })),
  on(fromMenuActions.menuLoadFridges, (state, { fridges }) => ({
    ...state,
    fridges,
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
  on(fromMenuActions.menuLoadProducts, (state, { products }) => ({
    ...state,
    products,
  })),
  on(fromOpenLotActions.openLotStartLoad, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromCloseLotActions.closeLotStartLoad, (state) => ({
    ...state,
    loading: true,
  }))
);
