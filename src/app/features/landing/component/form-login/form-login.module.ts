import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { FormLoginComponent } from "./form-login.component";

const COMMON_IMPORTS = [
  CommonModule,
  FormsModule,
  IonicModule,
  ReactiveFormsModule,
];

const COMMON_DECLARATIONS = [FormLoginComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS,
})
export class FormLoginModule {}
