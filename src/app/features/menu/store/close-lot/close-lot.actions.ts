import { createAction, props } from "@ngrx/store";
import { LotProductInterface } from "src/app/shared/models/lot-product.interface";

const CLOSE_LOT_START_LOAD = "[CLOSE LOT] Start Load";

export const closeLotStartLoad = createAction(
  CLOSE_LOT_START_LOAD,
  props<{ lot: LotProductInterface }>()
);
