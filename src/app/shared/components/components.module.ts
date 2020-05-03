import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { StepperComponent } from './stepper/stepper.component';

const COMMON_DECLARATIONS = [HeaderComponent, StepperComponent];

const COMMON_IMPORTS = [CommonModule, IonicModule];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS
})
export class ComponentsModule {}
