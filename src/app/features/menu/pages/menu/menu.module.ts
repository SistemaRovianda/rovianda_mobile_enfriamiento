import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MenuPage } from "./menu.page";
import { Routes, RouterModule } from "@angular/router";
import { ComponentsModule } from "src/app/shared/components/components.module";

const routes: Routes = [
  {
    path: "",
    component: MenuPage,
  },
];

const COMMON_DECLARATIONS = [MenuPage];

const COMMON_IMPORTS = [
  CommonModule,
  FormsModule,
  IonicModule,
  RouterModule.forChild(routes),
  ComponentsModule,
];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
})
export class MenuPageModule {}
