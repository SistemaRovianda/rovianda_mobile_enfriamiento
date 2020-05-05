import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { userReducer } from "../landing/store/user/user.reducer";
import { loginReducer } from "../landing/store/login/login.reducer";

export const reducers: ActionReducerMap<AppStateInterface> = {
  user: userReducer,
  login: loginReducer,
};

export const metaReducers: MetaReducer<AppStateInterface>[] = [];
