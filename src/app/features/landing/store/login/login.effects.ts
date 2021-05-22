import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import * as fromLoginActions from "src/app/features/landing/store/login/login.action";
import * as fromUserActions from "src/app/features/landing/store/user/user.action";
import { exhaustMap, switchMap, catchError, tap, delay } from "rxjs/operators";
import { of, from } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";
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
      exhaustMap((action) =>
        this.auth.signIn(action.email, action.password).pipe(
          switchMap(({ uid, token }) => {
            return [
              fromLoginActions.startLoad(),
              fromUserActions.loadUser({ uid, token }),
              fromUserActions.loadCurrentToken({ uid }),
            ];
          }),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure({ error: error.message })
            )
          )
        )
      )
    )
  );

  loadCurrentTokenEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromUserActions.loadCurrentToken),
      exhaustMap((action) =>
        this.auth.getTokenCurrentUser().pipe(
          switchMap((res) => {
            localStorage.setItem("uid", action.uid);
            localStorage.setItem("token", res.token);
            return [
              fromUserActions.loadCurrentTokenSuccess({
                currentToken: res.currentToken,
              }),
              fromLoginActions.signAuthSuccess({
                uid: action.uid,
                currentToken: res.currentToken,
              }),
            ];
          }),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure({ error })
            )
          )
        )
      )
    )
  );

  signAuthSuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signAuthSuccess),
      exhaustMap((action) =>
        this.auth.getUserData(action.uid).pipe(
          switchMap(({ name, firstSurname, lastSurname, email, rol }) => {
            localStorage.setItem("rol", rol);
            return [
              fromUserActions.loadUser({
                role: rol,
                firstSurname,
                lastSurname,
                name,
                email,
              }),
              fromLoginActions.signInSuccess(),
            ];
          }),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure({ error })
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
              : [fromLoginActions.signInFailure({ error: "No autorizado" })]
          ),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure({ error })
            )
          )
        )
      )
    )
  );

  signInFailureEffect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromLoginActions.signInFailure),
        tap((action) => { 
          console.error("Error en inicio de sesion: ", action.error);
          localStorage.clear();
        })
      ),
    {
      dispatch: false,
    }
  );

  signOutEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signOut),
      exhaustMap((action) =>
        this.auth.signOut().pipe(
          switchMap((action) => [fromUserActions.clearUser()]),
          catchError((error) => of(fromLoginActions.signOutFailured({ error })))
        )
      )
    )
  );
}
