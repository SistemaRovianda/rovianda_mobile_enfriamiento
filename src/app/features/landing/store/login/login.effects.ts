import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import * as fromLoginActions from "src/app/features/landing/store/login/login.action";
import * as fromUserActions from "src/app/features/landing/store/user/user.action";
import { exhaustMap, switchMap, catchError, tap, delay } from "rxjs/operators";
import { of, forkJoin, from } from "rxjs";
import { AuthService } from "src/app/shared/Services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class LoginEffects {
  constructor(
    private action$: Actions,
    private auth: AuthService,
    private router: Router
  ) {}

  signInEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signIn),
      delay(2000),
      exhaustMap((action) => {
        return forkJoin(
          this.auth.signIn(action.email, action.password),
          this.auth.getTokenCurrentUser()
        ).pipe(
          switchMap(([{ uid, token }, { currentToken }]) => {
            return [
              fromLoginActions.startLoad(),
              fromUserActions.loadUser({ uid, token }),
              fromUserActions.loadCurrentToken({ currentToken }),
              fromLoginActions.signAuthSuccess({ uid }),
            ];
          }),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure(error)
            )
          )
        );
      })
    )
  );

  signAuthSuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signAuthSuccess),
      exhaustMap((action) =>
        this.auth.getUserData(action.uid).pipe(
          delay(3000),
          switchMap(({ token }) => [
            fromUserActions.loadUser({ token }),
            fromLoginActions.signInSuccess(),
          ]),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure(error)
            )
          )
        )
      )
    )
  );

  signInSuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signInSuccess),
      exhaustMap((action) =>
        from(this.router.navigate(["/menu"])).pipe(
          switchMap((result) =>
            result
              ? [fromLoginActions.finishLoad()]
              : [fromLoginActions.signInFailure({ error: "Usuario no valido" })]
          ),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure(error)
            )
          )
        )
      )
    )
  );
}
