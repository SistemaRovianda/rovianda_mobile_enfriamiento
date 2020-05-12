import { MenuEffects } from "../menu/store/menu/menu.effects";
import { OpenLotEffects } from "../menu/store/open-lot/open-lot.effects";
import { CloseLotEffects } from "../menu/store/close-lot/close-lot.effects";
import { LoginEffects } from "../landing/store/login/login.effects";

export const effects = [
  MenuEffects,
  OpenLotEffects,
  CloseLotEffects,
  LoginEffects,
];
