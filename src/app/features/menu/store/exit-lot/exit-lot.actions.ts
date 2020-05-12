import { createAction, props } from "@ngrx/store";
import { ReportExitInterface } from "src/app/shared/models/report-exit.interface";

const EXIT_LOT_START_LOAD = "[EXIT LOT] Start Load";

const EXIT_LOT_LOAD_SUCCESS = "[EXIT LOT] Load Success";

export const exitLotStartLoad = createAction(
  EXIT_LOT_START_LOAD,
  props<{ report: ReportExitInterface }>()
);

export const exitLotLoadSuccess = createAction(EXIT_LOT_LOAD_SUCCESS);
