import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { InquietudService } from "src/app/shared/services/inquietud.service";
import { catchError, delay, exhaustMap, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import * as fromMenuActions from "src/app/features/menu/store/menu/menu.actions";
import {closeLotStartLoad} from "./close-lot.actions"

@Injectable()
export class CloseLotEffects {
  constructor(private action$: Actions, private inquietud: InquietudService) {}

  loadOpenLotEffects = createEffect(() =>
    this.action$.pipe(
      ofType(closeLotStartLoad),
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
