import { createAction, props } from "@ngrx/store";
import { UserInterface } from "src/app/shared/models/user.interface";

const LOAD_USER = "[USER] Load User";

const LOAD_CURRENT_TOKEN = "[USER] Load Current Token";

const LOAD_CURRENT_TOKEN_SUCCESS = "[USER] Load Current Token Success";

const CLEAR_USER = "[USER] Clear User";

export const loadUser = createAction(LOAD_USER, props<UserInterface>());

export const loadCurrentToken = createAction(
  LOAD_CURRENT_TOKEN,
  props<{ uid: string }>()
);

export const loadCurrentTokenSuccess = createAction(
  LOAD_CURRENT_TOKEN_SUCCESS,
  props<{ currentToken: string }>()
);

export const clearUser = createAction(CLEAR_USER);
