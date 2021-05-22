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
  SELECT_MENU_RAW_MATERIAL,
} from "../../store/menu/menu.select";
import { AlertController } from "@ionic/angular";
import { openLotStartLoad } from "../../store/open-lot/open-lot.actions";
import { FridgeInterface } from "src/app/shared/models/fridge.interface";
import { LotInterface } from "src/app/shared/models/lot.interface";
import { MaterialInterface } from "src/app/shared/models/material.interface";
import { RawMaterialInterface } from "src/app/shared/models/rawMaterial.interface";

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

  products: RawMaterialInterface[];

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
      let alreadyAdd=[];
      let list=[];
      for(let temp of tempLots){
          if(!alreadyAdd.includes(temp.loteId)){
            list.push({loteId:temp.loteId});
            alreadyAdd.push(temp.loteId);
          }
      }
      list=list.sort((a,b)=>a.loteId-b.loteId);
      this.lots = list;
    });

    this.store
      .select(SELECT_MENU_FRIDGES)
      .subscribe((tempFridges) => (this.fridges = tempFridges));

    this.store
      .select(SELECT_MENU_RAW_MATERIAL)
      .subscribe(
        (tempRaw) =>
          (this.products = tempRaw.filter((raw) => raw.status === "PENDING"))
      );
  }

  checkValues() {
    console.log("checando valores");
    this.store.dispatch(
      fromStepperActions.stepperNext({
        num: 0,
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
                  loteId: this.lot.value,
                  date: new Date(this.date.value).toISOString().split("T")[0],
                  status: "OPENED",
                  fridgeId: this.fridge.value,
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

  selectFridge() {
    this.store.dispatch(
      fromMenuActions.menuSelectFridge({
        fridge_id: this.fridge.value,
        status: "PENDING",
      })
    );
  }

  selectLot() {
    this.store.dispatch(
      fromMenuActions.menuSelectLotInternal({
        lotId: this.lot.value,
        fridgeId: this.fridge.value
      })
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
