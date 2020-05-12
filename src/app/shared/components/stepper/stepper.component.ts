import { Component, OnInit } from "@angular/core";
import { StepperInterface } from "../../models/stepper.interface";
import { AppStateInterface } from "../../models/app-state.interface";
import { Store } from "@ngrx/store";
import { SELECT_STEPS } from "src/app/features/menu/store/stepper/stepper.select";
import * as fromStepperActions from "../../../features/menu/store/stepper/stepper.actions";

@Component({
  selector: "app-stepper",
  templateUrl: "./stepper.component.html",
  styleUrls: ["./stepper.component.scss"],
})
export class StepperComponent implements OnInit {
  steppers: boolean[];

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit() {
    this.store
      .select(SELECT_STEPS)
      .subscribe((temSteps) => (this.steppers = temSteps));
  }

  next(num, step) {
    this.store.dispatch(fromStepperActions.stepperNext({ num, step }));
  }

  prev() {
    this.store.dispatch(fromStepperActions.stepperPrev());
  }

  getStep(step) {
    return this.steppers[step];
  }
}
