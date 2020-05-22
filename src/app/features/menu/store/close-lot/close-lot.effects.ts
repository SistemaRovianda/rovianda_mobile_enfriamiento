import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MeatService } from "src/app/shared/services/meat.service";
import { catchError, delay, exhaustMap, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import * as fromMenuActions from "src/app/features/menu/store/menu/menu.actions";
import { closeLotStartLoad } from "./close-lot.actions";

@Injectable()
export class CloseLotEffects {
  constructor(private action$: Actions, private meatService: MeatService) {}

  loadOpenLotEffects = createEffect(() =>
    this.action$.pipe(
      ofType(closeLotStartLoad),
      exhaustMap((action) =>
        this.meatService.status(action.status).pipe(
          delay(3000),
          switchMap((_) => [fromMenuActions.menuLoadSuccess()]),
          catchError((error) =>
            of(
              fromMenuActions.menuFinisLoad(),
              fromMenuActions.menuFailure(error)
            )
          )
        )
      )
    )
  );
}
