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
} from "../../store/menu/menu.select";
import { AlertController } from "@ionic/angular";
import { openLotStartLoad } from "../../store/open-lot/open-lot.actions";

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

  lots: LotProductInterface[];

  products: LotProductInterface[];

  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private alertCtrl: AlertController
  ) {}

  lotForm = this.fb.group({
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
      .select(SELECT_MENU_PRODUCTS)
      .subscribe((tempProducts) => (this.products = tempProducts));
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

  selectLot() {
    this.store.dispatch(fromMenuActions.menuSelectLot({ lot: this.lot.value }));
  }

  requestOpenLot() {
    console.log(this.lotForm.value);
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
                lot: {
                  loteId: this.lot.value,
                  productId: this.product.value.loteId,
                  date: this.date.value,
                },
              })
            );
          },
        },
      ],
    });
    (await alert).present();
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
