import { createAction, props } from "@ngrx/store";
import { LotProductInterface } from "src/app/shared/models/lot-product.interface";
import { FridgeInterface } from "src/app/shared/models/fridge.interface";
import { LotInterface } from "src/app/shared/models/lot.interface";
import { RawMaterialInterface } from "src/app/shared/Models/rawMaterial.interface";

const MENU_START_LOAD = "[MENU] Start Load";

const MENU_LOAD_FRIDGES = "[MENU] Load Fridges";

const MENU_FINISH_LOAD = "[MENU] Finish Load";

const MENU_FAILURE = "[MENU] Failure";

const MENU_SELECT_FRIDGE = "[MENU] Select Fridge";

const MENU_SELECT_LOT_INTERNAL = "[MENU] Select Lot Internal";

const MENU_LOAD_LOTS = "[MENU] Load Lots";

const MENU_LOAD_RAW_MATERIAL = "[MENU] Raw Material";

const MENU_START_LOAD_PRODUCTS = "[MENU] Start Load Products";

const MENU_LOAD_PRODUCTS = "[MENU] Load Products";

const MENU_LOAD_SUCCESS = "[MENU] Load Success";

export const menuStartLoad = createAction(MENU_START_LOAD);

export const menuLoadFridges = createAction(
  MENU_LOAD_FRIDGES,
  props<{ fridges: FridgeInterface[] }>()
);

export const menuSelectFridge = createAction(
  MENU_SELECT_FRIDGE,
  props<{ fridge_id: number; status: string }>()
);

export const menuSelectLotInternal = createAction(
  MENU_SELECT_LOT_INTERNAL,
  props<{ lotId: number }>()
);

export const menuFinisLoad = createAction(MENU_FINISH_LOAD);

export const menuFailure = createAction(
  MENU_FAILURE,
  props<{ error: string }>()
);

export const menuLoadLots = createAction(
  MENU_LOAD_LOTS,
  props<{ lots: LotInterface[] }>()
);

export const menuLoadRawMaterial = createAction(
  MENU_LOAD_RAW_MATERIAL,
  props<{ rawMaterial: RawMaterialInterface[] }>()
);

export const menuStartLoadProducts = createAction(MENU_START_LOAD_PRODUCTS);

export const menuLoadProducts = createAction(
  MENU_LOAD_PRODUCTS,
  props<{ products: LotProductInterface[] }>()
);

export const menuLoadSuccess = createAction(MENU_LOAD_SUCCESS);
