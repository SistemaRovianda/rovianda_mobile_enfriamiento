import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { InquietudService } from "src/app/shared/services/inquietud.service";
import { catchError, delay, exhaustMap, switchMap } from "rxjs/operators";
import { openLotStartLoad } from "./open-lot.actions";
import { of } from "rxjs";
import * as fromMenuActions from "src/app/features/menu/store/menu/menu.actions";

@Injectable()
export class OpenLotEffects {
  constructor(private action$: Actions, private inquietud: InquietudService) {}

  loadOpenLotEffects = createEffect(() =>
    this.action$.pipe(
      ofType(openLotStartLoad),
      exhaustMap((action) =>
        this.inquietud.entrance(action.lot).pipe(
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
