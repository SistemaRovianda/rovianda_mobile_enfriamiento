import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ExitLotPage } from "./exit-lot.page";
import { Routes, RouterModule } from "@angular/router";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FormExitModule } from "../../component/form-exit/form-exit.module";

const routes: Routes = [
  {
    path: "",
    component: ExitLotPage,
  },
];

const COMMON_IMPORTS = [
  CommonModule,
  FormsModule,
  IonicModule,
  RouterModule.forChild(routes),
  ComponentsModule,
  ReactiveFormsModule,
  FormExitModule,
];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: [ExitLotPage],
})
export class ExitLotPageModule {}
