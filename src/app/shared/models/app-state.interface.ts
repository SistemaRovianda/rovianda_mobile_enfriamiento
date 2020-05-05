import { StepperInterface } from "./stepper.interface";
import { MenuInterface } from "./menu.interface";

export interface AppStateInterface {
  stepper: StepperInterface;
  menu: MenuInterface;
}
