import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MeatService } from "src/app/shared/services/meat.service";
import {
  exitLotStartLoad,
  exitLotLoadSuccess,
  exitLoadProducts,
} from "./exit-lot.actions";
import { exhaustMap, delay, switchMap, catchError } from "rxjs/operators";
import * as fromMenuActions from "src/app/features/menu/store/menu/menu.actions";
import { Router } from "@angular/router";
import { from, of } from "rxjs";
import { ProductService } from "src/app/shared/services/product.service";
import { ToastService } from "src/app/shared/services/toast.service";

@Injectable()
export class ExitLotEffects {
  constructor(
    private action$: Actions,
    private inquietud: MeatService,
    private product: ProductService,
    private router: Router,
    private toast: ToastService
  ) {}

  loadExitLotEffects = createEffect(() =>
    this.action$.pipe(
      ofType(exitLotStartLoad),
      exhaustMap((action) =>
        this.inquietud.exit(action.report).pipe(
          switchMap((_) => {
            this.toast.presentToastSuccess();
            return [exitLotLoadSuccess()];
          })
        )
      )
    )
  );

  loadSuccessEffects = createEffect(() =>
    this.action$.pipe(
      ofType(exitLotLoadSuccess),
      exhaustMap((action) =>
        from(this.router.navigate(["/menu"])).pipe(
          switchMap((result) =>
            result
              ? [fromMenuActions.menuFinisLoad()]
              : [fromMenuActions.menuFailure({ error: "Usuario no valido" })]
          ),
          catchError((error) =>
            of(
              fromMenuActions.menuFinisLoad(),
              fromMenuActions.menuFailure({ error })
            )
          )
        )
      )
    )
  );
}
