import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { LotProductInterface } from "src/app/shared/models/lot-product.interface";
import { Router } from "@angular/router";
import { LotsService } from "src/app/shared/services/lots.service";
import { ProductService } from "src/app/shared/services/product.service";
import * as fromMenuActions from "./menu.actions";
import { exhaustMap, delay, switchMap, tap, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import { FridgeService } from "src/app/shared/services/fridge.service";
import { exitLoadProducts } from "../exit-lot/exit-lot.actions";
import { MeatService } from "src/app/shared/services/meat.service";

@Injectable()
export class MenuEffects {
  constructor(
    private action$: Actions,
    private lotsService: LotsService,
    private productsService: ProductService,
    private meat: MeatService,
    private router: Router,
    private fridge: FridgeService
  ) {}

  menuStartLoadEffect = createEffect(() =>
    this.action$.pipe(
      ofType(fromMenuActions.menuStartLoad),
      exhaustMap((action) =>
        this.fridge.fridges().pipe(
          switchMap((fridges) => [
            fromMenuActions.menuLoadFridges({ fridges }),
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

  loadLotsEffects$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromMenuActions.menuSelectFridge),
      exhaustMap((action) =>
        this.lotsService.getLots(action.fridge_id, action.status).pipe(
          switchMap((lots) => [
            fromMenuActions.menuLoadLots({ lots }),
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

  loadRawMaterialEffects$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromMenuActions.menuSelectLotInternal),
      exhaustMap((action) =>
        this.meat.raw(action.lotId,action.fridgeId).pipe(
          switchMap((rawMaterial) => [
            fromMenuActions.menuLoadRawMaterial({ rawMaterial }),
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

  loadProductsEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(exitLoadProducts),
      exhaustMap((action) =>
        this.productsService.getAllProductsFridge().pipe(
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
