import { createAction, props } from "@ngrx/store";
import { LotProductInterface } from "src/app/shared/models/lot-product.interface";

const OPEN_LOT_START_LOAD = "[OPEN LOT] Start Load";

export const openLotStartLoad = createAction(
  OPEN_LOT_START_LOAD,
  props<{ lot: LotProductInterface }>()
);
