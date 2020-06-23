import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormExitComponent } from "./form-exit.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const COMMON_DECLARATIONS = [FormExitComponent];

const COMMON_IMPORTS = [
  CommonModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS,
})
export class FormExitModule {}
