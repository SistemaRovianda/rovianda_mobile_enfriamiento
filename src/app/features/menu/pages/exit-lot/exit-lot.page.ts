import { Component, OnInit } from "@angular/core";
import { HeaderInterface } from "src/app/shared/models/header.interface";
import { FormBuilder, Validators } from "@angular/forms";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { AlertController } from "@ionic/angular";
import { Store } from "@ngrx/store";

import {
  SELECT_MENU_LOADING, 
} from "../../store/menu/menu.select";


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
