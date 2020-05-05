import { UserInterface } from "./user.interface";
import { LoginPageInterface } from "./login-page.interface";

export interface AppStateInterface {
  user: UserInterface;
  login: LoginPageInterface;
}
