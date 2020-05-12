import { createAction, props } from "@ngrx/store";

const STEPPER_NEXT = "[STEPPER] Next";

const STEPPER_PREV = "[STEPPER] Prev";

const STEPPER_INIT = "[STEPPER] Stepper Init";

export const stepperNext = createAction(
  STEPPER_NEXT,
  props<{ num: number; step: boolean }>()
);

export const stepperPrev = createAction(STEPPER_PREV);

export const stepperInit = createAction(STEPPER_INIT);
