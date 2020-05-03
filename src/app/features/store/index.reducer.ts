import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";

export const reducers: ActionReducerMap<AppStateInterface> = {};

export const metaReducers: MetaReducer<AppStateInterface>[] = [];
