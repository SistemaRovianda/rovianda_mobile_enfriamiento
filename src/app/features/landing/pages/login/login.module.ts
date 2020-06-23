import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { LoginPage } from "./login.page";
import { Routes, RouterModule } from "@angular/router";
import { FormLoginModule } from "../../component/form-login/form-login.module";

const routes: Routes = [
  {
    path: "",
    component: LoginPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FormLoginModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
