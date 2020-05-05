import { createReducer, on } from "@ngrx/store";
import { UserInterface } from "src/app/shared/Models/user.interface";
import * as fromUserActions from "src/app/features/landing/store/user/user.action";

const STATE_INITIAL_USER: UserInterface = {
  uid: null,
  token: null,
  name: null,
  firstSurname: null,
  lastSurname: null,
  email: null,
  phone: null,
  type: null,
  role: null,
};

export const userReducer = createReducer<UserInterface>(
  STATE_INITIAL_USER,
  on(fromUserActions.loadUser, (state, userCredential) => ({
    ...state,
    ...userCredential,
  })),
  on(fromUserActions.clearUser, (state) => ({
    ...state,
    ...STATE_INITIAL_USER,
  }))
);
