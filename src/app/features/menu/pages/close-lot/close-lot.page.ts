import { Component, OnInit } from "@angular/core";
import { HeaderInterface } from "src/app/shared/models/header.interface";
import { LotProductInterface } from "src/app/shared/models/lot-product.interface";
import { FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/Models/app-state.interface";
import { AlertController } from "@ionic/angular";
import * as fromStepperActions from "src/app/features/menu/store/stepper/stepper.actions";
import * as fromMenuActions from "src/app/features/menu/store/menu/menu.actions";
import {
  SELECT_MENU_LOADING,
  SELECT_MENU_LOTS,
  SELECT_MENU_PRODUCTS,
  SELECT_MENU_FRIDGES,
} from "../../store/menu/menu.select";
import { closeLotStartLoad } from "../../store/close-lot/close-lot.actions";
import { LotInterface } from "src/app/shared/Models/lot.interface";
import { MaterialInterface } from "src/app/shared/Models/material.interface";
import { FridgeInterface } from "src/app/shared/Models/fridge.interface";
@Component({
  selector: "app-close-lot",
  templateUrl: "./close-lot.page.html",
  styleUrls: ["./close-lot.page.scss"],
})
export class CloseLotPage implements OnInit {
  header: HeaderInterface = {
    namePath: "Regresar",
    path: "/menu",
  };

  lots: LotInterface[];

  products: MaterialInterface[];

  fridges: FridgeInterface[] = [];

  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private alertCtrl: AlertController
  ) {}

  lotForm = this.fb.group({
    fridge: ["", [Validators.required]],
    lot: ["", [Validators.required]],
    product: ["", [Validators.required]],
    date: [new Date().toISOString(), [Validators.required]],
  });

  ngOnInit() {
    this.lotForm.valueChanges.subscribe((_) => this.checkValues());
    this.store
      .select(SELECT_MENU_LOADING)
      .subscribe((tempLoading) => (this.loading = tempLoading));
    this.store
      .select(SELECT_MENU_LOTS)
      .subscribe((tempLots) => (this.lots = tempLots));
    this.store
      .select(SELECT_MENU_FRIDGES)
      .subscribe((tempFridges) => (this.fridges = tempFridges));
  }

  checkValues() {
    console.log("checando valores"),
      this.store.dispatch(
        fromStepperActions.stepperNext({
          num: 1,
          step: this.lotForm.status !== "INVALID",
        })
      );
  }

  requestCloseLot() {
    console.log(this.lotForm.value);
    this.createAlert();
  }

  async createAlert() {
    const alert = this.alertCtrl.create({
      header: "Cerrar Lote",
      message: "Presione 'Confirmar' para cerrar lote",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Confirmar",
          handler: () => {
            this.store.dispatch(
              closeLotStartLoad({
                status: {
                  date: new Date(this.date.value).toISOString().split("T")[0],
                  fridgeId: this.fridge.value,
                  loteId: this.lot.value.loteId,
                  status: "CLOSED",
                },
              })
            );
          },
        },
      ],
    });
    (await alert).present();
  }

  selectFridge() {
    this.store.dispatch(
      fromMenuActions.menuSelectFridge({ fridge_id: this.fridge.value })
    );
  }

  get fridge() {
    return this.lotForm.get("fridge");
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
