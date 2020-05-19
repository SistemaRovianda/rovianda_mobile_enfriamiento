import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { LotProductInterface } from "src/app/shared/models/lot-product.interface";
import { Router } from "@angular/router";
import { LotsService } from "src/app/shared/services/lots.service";
import { ProductService } from "src/app/shared/services/product.service";
import * as fromMenuActions from "./menu.actions";
import { exhaustMap, delay, switchMap, tap, catchError } from "rxjs/operators";
import { from, of } from "rxjs";

@Injectable()
export class MenuEffects {
  constructor(
    private action$: Actions,
    private lotsService: LotsService,
    private productsService: ProductService,
    private router: Router
  ) {}

  loadLotsEffects$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromMenuActions.menuStartLoad),
      exhaustMap((action) =>
        this.lotsService.getLots(action.status).pipe(
          delay(3000),
          switchMap((lots) => [
            fromMenuActions.menuLoadLots({ lots }),
            fromMenuActions.menuFinisLoad(),
          ]),
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

  loadProductsEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromMenuActions.menuStartLoadProducts),
      exhaustMap((action) =>
        this.productsService.getAllProductsFridge().pipe(
          tap((o) => console.log(o)),
          switchMap((products) => [
            fromMenuActions.menuLoadProducts({ products }),
            fromMenuActions.menuFinisLoad(),
          ]),
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

  loadSuccessEffect = createEffect(() =>
    this.action$.pipe(
      ofType(fromMenuActions.menuLoadSuccess),
      exhaustMap((action) =>
        from(this.router.navigate(["/menu"])).pipe(
          switchMap((result) =>
            result
              ? [fromMenuActions.menuFinisLoad()]
              : [
                  fromMenuActions.menuFailure({
                    error: "Usuario no valido",
                  }),
                ]
          ),
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
