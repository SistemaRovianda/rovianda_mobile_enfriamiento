import { Component, OnInit } from "@angular/core";
import { HeaderInterface } from "src/app/shared/models/header.interface";
import { FormBuilder, Validators } from "@angular/forms";
import * as fromStepperActions from "../../store/stepper/stepper.actions";
import * as fromMenuActions from "../../store/menu/menu.actions";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { Store } from "@ngrx/store";
import { LotProductInterface } from "src/app/shared/models/lot-product.interface";
import {
  SELECT_MENU_LOADING,
  SELECT_MENU_LOTS,
  SELECT_MENU_PRODUCTS,
  SELECT_MENU_FRIDGES,
} from "../../store/menu/menu.select";
import { AlertController } from "@ionic/angular";
import { openLotStartLoad } from "../../store/open-lot/open-lot.actions";
import { FridgeInterface } from "src/app/shared/models/fridge.interface";
import { LotInterface } from "src/app/shared/Models/lot.interface";
import { MaterialInterface } from "src/app/shared/models/material.interface";

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
    this.store.select(SELECT_MENU_LOTS).subscribe((tempLots) => {
      this.lots = tempLots;
    });

    this.store
      .select(SELECT_MENU_FRIDGES)
      .subscribe((tempFridges) => (this.fridges = tempFridges));
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

  requestOpenLot() {
    this.createAlert();
  }

  async createAlert() {
    const alert = this.alertCtrl.create({
      header: "Abrir Lote",
      message: "Presione 'Confirmar' para abrir lote",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Confirmar",
          handler: () => {
            this.store.dispatch(
              openLotStartLoad({
                status: {
                  date: new Date(this.date.value).toISOString().split("T")[0],
                  fridgeId: this.fridge.value,
                  loteId: this.lot.value.loteId,
                  status: "OPENED",
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
