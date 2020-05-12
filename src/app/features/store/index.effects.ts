import { MenuEffects } from "../menu/store/menu/menu.effects";
import { OpenLotEffects } from "../menu/store/open-lot/open-lot.effects";
import { CloseLotEffects } from "../menu/store/close-lot/close-lot.effects";
import { ExitLotEffects } from "../menu/store/exit-lot/exit-lot.effects";

export const effects = [
  MenuEffects,
  OpenLotEffects,
  CloseLotEffects,
  ExitLotEffects,
];
