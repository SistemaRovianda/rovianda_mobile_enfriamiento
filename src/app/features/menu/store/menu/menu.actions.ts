import { createAction, props } from "@ngrx/store";
import { LotProductInterface } from "src/app/shared/models/lot-product.interface";

const MENU_START_LOAD = "[MENU] Start Load";

const MENU_FINISH_LOAD = "[MENU] Finish Load";

const MENU_FAILURE = "[MENU] Failure";

const MENU_LOAD_LOTS = "[MENU] Load Lots";

const MENU_START_LOAD_PRODUCTS = "[MENU] Start Load Products";

const MENU_LOAD_PRODUCTS = "[MENU] Load Products";

const MENU_LOAD_SUCCESS = "[MENU] Load Success";

export const menuStartLoad = createAction(
  MENU_START_LOAD,
  props<{ status: string }>()
);

export const menuFinisLoad = createAction(MENU_FINISH_LOAD);

export const menuFailure = createAction(
  MENU_FAILURE,
  props<{ error: string }>()
);

export const menuLoadLots = createAction(
  MENU_LOAD_LOTS,
  props<{ lots: LotProductInterface[] }>()
);

export const menuStartLoadProducts = createAction(MENU_START_LOAD_PRODUCTS);

export const menuLoadProducts = createAction(
  MENU_LOAD_PRODUCTS,
  props<{ products: LotProductInterface[] }>()
);

export const menuLoadSuccess = createAction(MENU_LOAD_SUCCESS);
