import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MeatService } from "src/app/shared/services/meat.service";
import { catchError, delay, exhaustMap, switchMap } from "rxjs/operators";
import { openLotStartLoad } from "./open-lot.actions";
import { of } from "rxjs";
import * as fromMenuActions from "src/app/features/menu/store/menu/menu.actions";
import { ToastService } from "src/app/shared/services/toast.service";

@Injectable()
export class OpenLotEffects {
  constructor(
    private action$: Actions,
    private inquietud: MeatService,
    private toast: ToastService
  ) {}

  loadOpenLotEffects = createEffect(() =>
    this.action$.pipe(
      ofType(openLotStartLoad),
      exhaustMap((action) =>
        this.inquietud.status(action.status).pipe(
          switchMap((_) => {
            this.toast.presentToastSuccess();
            return [fromMenuActions.menuLoadSuccess()];
          }),
          catchError((error) => {
            this.toast.presentToastError();
            return of(
              fromMenuActions.menuFinisLoad(),
              fromMenuActions.menuFailure(error)
            );
          })
        )
      )
    )
  );
}
