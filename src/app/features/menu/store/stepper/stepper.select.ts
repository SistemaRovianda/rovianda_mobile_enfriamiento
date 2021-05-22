import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_STEPPER_INITIAL = (state: AppStateInterface) => state.stepper;

export const SELECT_STEPS = createSelector(
  SELECT_STEPPER_INITIAL,
  (state) => state.steps
);
