import { createAction, props } from "@ngrx/store";
import { ReportExitInterface } from "src/app/shared/models/report-exit.interface";

const EXIT_LOT_START_LOAD = "[EXIT LOT] Start Load";

const EXIT_LOAD_PRODUCTS = "[EXIT LOT] Load Products";

const EXIT_LOT_LOAD_SUCCESS = "[EXIT LOT] Load Success";

export const exitLotStartLoad = createAction(
  EXIT_LOT_START_LOAD,
  props<{ report: ReportExitInterface }>()
);

export const exitLoadProducts = createAction(EXIT_LOAD_PRODUCTS);

export const exitLotLoadSuccess = createAction(EXIT_LOT_LOAD_SUCCESS);
