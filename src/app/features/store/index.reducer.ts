import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { StepperReducer } from '../menu/store/stepper/stepper.reducer';

export const reducers: ActionReducerMap<AppStateInterface> = {
    stepper: StepperReducer
};

export const metaReducers: MetaReducer<AppStateInterface>[] = [];
