import { Component, OnInit } from "@angular/core";
import { HeaderInterface } from "src/app/shared/models/header.interface";
import { FormBuilder, Validators } from "@angular/forms";
import * as fromStepperActions from "../../store/stepper/stepper.actions";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-open-lot",
  templateUrl: "./open-lot.page.html",
  styleUrls: ["./open-lot.page.scss"],
})
export class OpenLotPage implements OnInit {
  header: HeaderInterface = {
    namePath: "Regresar",
    path: "/menu",
  };

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {}

  lotForm = this.fb.group({
    lot: ["", [Validators.required]],
    product: ["", [Validators.required]],
    date: [new Date().toISOString(), [Validators.required]],
  });

  ngOnInit() {
    this.lotForm.valueChanges.subscribe((_) => this.checkValues());
  }

  checkValues() {
    console.log("checando valores");
    this.store.dispatch(
      fromStepperActions.stepperNext({
        num: 1,
        step: this.lotForm.status !== "INVALID",
      })
    );
  }

  get lot() {
    return this.lotForm.get("lot");
  }

  get product() {
    return this.lotForm.get("product");
  }

  get date() {
    return this.lotForm.get("date");
  }
}
