import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/Models/app-state.interface";
import { LotProductInterface } from "src/app/shared/Models/lot-product.interface";
import { RawMaterialInterface } from "src/app/shared/Models/rawMaterial.interface";
import { FridgeInterface } from "src/app/shared/Models/fridge.interface";
import * as fromStepperActions from "src/app/features/menu/store/stepper/stepper.actions";
import {
  SELECT_MENU_FRIDGES,
  SELECT_MENU_LOTS,
  SELECT_MENU_RAW_MATERIAL,
} from "../../store/menu/menu.select";
import * as fromMenuActions from "src/app/features/menu/store/menu/menu.actions";
import { AlertController } from '@ionic/angular';
import { exitLotStartLoad } from '../../store/exit-lot/exit-lot.actions';

@Component({
  selector: "app-form-exit",
  templateUrl: "./form-exit.component.html",
  styleUrls: ["./form-exit.component.scss"],
})
export class FormExitComponent implements OnInit {
  form: FormGroup;
  @Output("onSubmit") submit = new EventEmitter();

  lots: LotProductInterface[] = [];

  products: RawMaterialInterface[];

  loading: boolean;

  fridges: FridgeInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private alertCtrl: AlertController
  ) {
    this.form = fb.group({
      fridge: ["", [Validators.required]],
      date: [new Date().toISOString(), [Validators.required]],
      lotInternal: ["", [Validators.required]],
      product: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      observations: [""],
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((_) => this.checkValues());
    this.store
      .select(SELECT_MENU_FRIDGES)
      .subscribe((tempFridges) => (this.fridges = tempFridges));
    this.store
      .select(SELECT_MENU_LOTS)
      .subscribe((tempLots) => (this.lots = tempLots));
    this.store
      .select(SELECT_MENU_RAW_MATERIAL)
      .subscribe(
        (rawMaterial) =>
          (this.products = rawMaterial.filter(
            (material) => material.status === "OPENED"
          ))
      );
  }

  checkValues() {
    this.store.dispatch(
      fromStepperActions.stepperNext({
        num: 0,
        step: this.form.valid,
      })
    );
  }

  selectFridge() {
    this.store.dispatch(
      fromMenuActions.menuSelectFridge({
        fridge_id: this.fridge.value,
        status: "OPENED",
      })
    );
  }

  selectLotInternal() {
    this.store.dispatch(
      fromMenuActions.menuSelectLotInternal({
        lotId: this.lotInternal.value.loteId,
      })
    );
  }

  onSubmit() {
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
                  loteId: this.lotInternal.value.loteId,
                  observations: this.observations.value,
                  date: new Date(this.date.value).toISOString().split("T")[0],
                  quantity: this.quantity.value,
                  materialId: this.product.value,
                },
              })
            );
          },
        },
      ],
    });
    (await alert).present();
  }

  get fridge() {
    return this.form.get("fridge");
  }

  get date() {
    return this.form.get("date");
  }

  get lot() {
    return this.form.get("lot");
  }

  get lotInternal() {
    return this.form.get("lotInternal");
  }

  get product() {
    return this.form.get("product");
  }

  get quantity() {
    return this.form.get("quantity");
  }

  get observations() {
    return this.form.get("observations");
  }
}
