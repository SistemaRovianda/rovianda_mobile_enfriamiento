import { createAction, props } from "@ngrx/store";
import { LotProductInterface } from "src/app/shared/models/lot-product.interface";
import { StatusInterface } from "src/app/shared/models/status.interface";

const OPEN_LOT_START_LOAD = "[OPEN LOT] Start Load";

export const openLotStartLoad = createAction(
  OPEN_LOT_START_LOAD,
  props<{ status: StatusInterface }>()
);
