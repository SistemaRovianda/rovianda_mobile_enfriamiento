import * as fromStepperActions from "./stepper.actions";
import { createReducer, on } from "@ngrx/store";
import { StepperInterface } from "src/app/shared/Models/stepper.interface";

const STATE_INITIAL_STEPPER: StepperInterface = {
  steps: [false],
};

export const StepperReducer = createReducer<StepperInterface>(
  STATE_INITIAL_STEPPER,
  on(fromStepperActions.stepperNext, (state, { num, step }) => ({
    ...state,
    steps: state.steps.concat().map((tempStep, i) => {
      if (i === num) {
        return step;
      }
      return tempStep;
    }),
  })),
  on(fromStepperActions.stepperPrev, (state) => ({
    ...state,
    steps: state.steps.slice(1).concat(false),
  })),
  on(fromStepperActions.stepperInit, (state) => STATE_INITIAL_STEPPER)
);
