import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { OpenLotPage } from "./open-lot.page";
import { Routes, RouterModule } from "@angular/router";
import { ComponentsModule } from "src/app/shared/components/components.module";

const routes: Routes = [
  {
    path: "",
    component: OpenLotPage,
  },
];

const COMMON_IMPORTS = [
  CommonModule,
  FormsModule,
  IonicModule,
  RouterModule.forChild(routes),
  ComponentsModule,
  ReactiveFormsModule,
];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: [OpenLotPage],
})
export class OpenLotPageModule {}
