import { createAction, props } from "@ngrx/store";
import { UserInterface } from "src/app/shared/Models/user.interface";

const SIGN_IN = "[LOGIN] Sign In";

const SIGN_IN_SUCCESS = "[LOGIN] Sign In Success";

const SIGN_AUTH_SUCCESS = "[LOGIN] Sing Auth Success";

const START_LOAD = "[LOGIN] Start Load";

const FINISH_LOAD = "[LOGIN] Finish Load";

const SIGN_OUT = "[LOGIN] Sing Out";

const SING_IN_FAILURE = "[LOGIN] Sing In Failure";

const SIGN_OUT_SUCCESS = "[LOGIN] Sign Out Success";

export const signIn = createAction(
  SIGN_IN,
  props<{ email: string; password: string }>()
);

export const signInSuccess = createAction(SIGN_IN_SUCCESS);

export const signAuthSuccess = createAction(
  SIGN_AUTH_SUCCESS,
  props<UserInterface>()
);

export const startLoad = createAction(START_LOAD);

export const finishLoad = createAction(FINISH_LOAD);

export const signOut = createAction(SIGN_OUT);

export const signInFailure = createAction(
  SING_IN_FAILURE,
  props<{ error: string }>()
);

export const signOutSuccess = createAction(SIGN_OUT_SUCCESS);
