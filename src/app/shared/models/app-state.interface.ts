import { UserInterface } from "./user.interface";
import { LoginPageInterface } from "./login-page.interface";
import { StepperInterface } from "./stepper.interface";
import { MenuInterface } from "./menu.interface";

export interface AppStateInterface {
  user: UserInterface;
  login: LoginPageInterface;
  stepper: StepperInterface;
  menu: MenuInterface;
}
