import { createAction, props } from "@ngrx/store";
import { UserInterface } from "src/app/shared/Models/user.interface";

const LOAD_USER = "[USER] Load User";

const CLEAR_USER = "[USER] Clear User";

const LOAD_CURRENT_TOKEN = "[USER] Load Current User";

export const loadUser = createAction(LOAD_USER, props<UserInterface>());

export const loadCurrentToken = createAction(
  LOAD_CURRENT_TOKEN,
  props<{ currentToken: string }>()
);

export const clearUser = createAction(CLEAR_USER);
