import { Component, OnInit } from "@angular/core";
import { HeaderInterface } from "src/app/shared/models/header.interface";
import { FormBuilder, Validators } from "@angular/forms";
import { AppStateInterface } from "src/app/shared/Models/app-state.interface";
import { AlertController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { LotProductInterface } from "src/app/shared/Models/lot-product.interface";
import * as fromStepperActions from "src/app/features/menu/store/stepper/stepper.actions";
import * as fromMenuActions from "src/app/features/menu/store/menu/menu.actions";
import {
  SELECT_MENU_LOADING,
  SELECT_MENU_LOTS,
  SELECT_MENU_PRODUCTS,
} from "../../store/menu/menu.select";
import { exitLotStartLoad } from "../../store/exit-lot/exit-lot.actions";

@Component({
  selector: "app-exit-lot",
  templateUrl: "./exit-lot.page.html",
  styleUrls: ["./exit-lot.page.scss"],
})
export class ExitLotPage implements OnInit {
  header: HeaderInterface = {
    namePath: "Regresar",
    path: "/menu",
  };

  lots: LotProductInterface[];
  products: LotProductInterface[] = [
    { loteId: 1444, description: "producto 1" },
    { loteId: 1445, description: "producto 2" },
    { loteId: 1446, description: "producto 3" },
  ];

  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private alertCtrl: AlertController
  ) {}

  reportForm = this.fb.group({
    product: ["", [Validators.required]],
    date: [new Date().toISOString(), [Validators.required]],
    lot: ["", [Validators.required]],
    lotInternal: ["", [Validators.required]],
    quantity: ["", [Validators.required]],
    observations: [""],
  });

  ngOnInit() {
    this.reportForm.valueChanges.subscribe((_) => this.checkValues());
    this.store
      .select(SELECT_MENU_LOADING)
      .subscribe((tempLoading) => (this.loading = tempLoading));
    this.store
      .select(SELECT_MENU_LOTS)
      .subscribe((tempLots) => (this.lots = tempLots));
  }

  checkValues() {
    console.log("Verificando valores");
    this.store.dispatch(
      fromStepperActions.stepperNext({
        num: 1,
        step: this.reportForm.status !== "INVALID",
      })
    );
  }
  requestReport() {
    console.log(this.reportForm.value);

    this.createAlert();
  }

  async createAlert() {
    const alert = this.alertCtrl.create({
      message: "Una vez que genere el reporte este no podrá ser modificado",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Generar",
          handler: () => {
            this.store.dispatch(
              exitLotStartLoad({
                report: {
                  product: this.product.value,
                  date: this.date.value,
                  lot: this.lot.value,
                  lotInternal: this.lotInternal.value,
                  quantity: this.quantity.value,
                  observation: this.observations.value,
                },
              })
            );
          },
        },
      ],
    });
    (await alert).present();
  }

  get product() {
    return this.reportForm.get("product");
  }

  get date() {
    return this.reportForm.get("date");
  }

  get lot() {
    return this.reportForm.get("lot");
  }

  get lotInternal() {
    return this.reportForm.get("lotInternal");
  }

  get quantity() {
    return this.reportForm.get("quantity");
  }

  get observations() {
    return this.reportForm.get("observations");
  }
}
