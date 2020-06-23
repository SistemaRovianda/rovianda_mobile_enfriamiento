import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MeatService } from "src/app/shared/services/meat.service";
import { catchError, delay, exhaustMap, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import * as fromMenuActions from "src/app/features/menu/store/menu/menu.actions";
import { closeLotStartLoad } from "./close-lot.actions";
import { ToastService } from "src/app/shared/services/toast.service";

@Injectable()
export class CloseLotEffects {
  constructor(
    private action$: Actions,
    private meatService: MeatService,
    private toast: ToastService
  ) {}

  loadOpenLotEffects = createEffect(() =>
    this.action$.pipe(
      ofType(closeLotStartLoad),
      exhaustMap((action) =>
        this.meatService.status(action.status).pipe(
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
