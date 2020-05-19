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
} from "../../store/menu/menu.select";
import { closeLotStartLoad } from "../../store/close-lot/close-lot.actions";
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
