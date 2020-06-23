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
  SELECT_MENU_FRIDGES,
  SELECT_MENU_RAW_MATERIAL,
} from "../../store/menu/menu.select";
import {
  exitLotStartLoad,
  exitLoadProducts,
} from "../../store/exit-lot/exit-lot.actions";
import { FridgeInterface } from "src/app/shared/Models/fridge.interface";
import { RawMaterialInterface } from "src/app/shared/Models/rawMaterial.interface";

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

  loading: boolean;

  constructor(
    private store: Store<AppStateInterface>,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.store
      .select(SELECT_MENU_LOADING)
      .subscribe((tempLoading) => (this.loading = tempLoading));
  }
}
