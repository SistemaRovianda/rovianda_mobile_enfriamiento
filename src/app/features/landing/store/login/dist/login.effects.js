"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginEffects = void 0;
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var fromLoginActions = require("src/app/features/landing/store/login/login.action");
var fromUserActions = require("src/app/features/landing/store/user/user.action");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var LoginEffects = /** @class */ (function () {
    function LoginEffects(action$, auth, router) {
        var _this = this;
        this.action$ = action$;
        this.auth = auth;
        this.router = router;
        this.signInEffect$ = effects_1.createEffect(function () {
            return _this.action$.pipe(effects_1.ofType(fromLoginActions.signIn), operators_1.exhaustMap(function (action) {
                return _this.auth.signIn(action.email, action.password).pipe(operators_1.switchMap(function (_a) {
                    var uid = _a.uid, token = _a.token;
                    return [
                        fromLoginActions.startLoad(),
                        fromUserActions.loadUser({ uid: uid, token: token }),
                        fromUserActions.loadCurrentToken({ uid: uid }),
                    ];
                }), operators_1.catchError(function (error) {
                    return rxjs_1.of(fromLoginActions.finishLoad(), fromLoginActions.signInFailure({ error: error.message }));
                }));
            }));
        });
        this.loadCurrentTokenEffect$ = effects_1.createEffect(function () {
            return _this.action$.pipe(effects_1.ofType(fromUserActions.loadCurrentToken), operators_1.exhaustMap(function (action) {
                return _this.auth.getTokenCurrentUser().pipe(operators_1.switchMap(function (res) {
                    localStorage.setItem("uid", action.uid);
                    localStorage.setItem("token", res.token);
                    return [
                        fromUserActions.loadCurrentTokenSuccess({
                            currentToken: res.currentToken
                        }),
                        fromLoginActions.signAuthSuccess({
                            uid: action.uid,
                            currentToken: res.currentToken
                        }),
                    ];
                }), operators_1.catchError(function (error) {
                    return rxjs_1.of(fromLoginActions.finishLoad(), fromLoginActions.signInFailure({ error: error }));
                }));
            }));
        });
        this.signAuthSuccessEffect$ = effects_1.createEffect(function () {
            return _this.action$.pipe(effects_1.ofType(fromLoginActions.signAuthSuccess), operators_1.exhaustMap(function (action) {
                return _this.auth.getUserData(action.uid).pipe(operators_1.switchMap(function (_a) {
                    var name = _a.name, firstSurname = _a.firstSurname, lastSurname = _a.lastSurname, email = _a.email, rol = _a.rol;
                    localStorage.setItem("rol", rol);
                    return [
                        fromUserActions.loadUser({
                            role: rol,
                            firstSurname: firstSurname,
                            lastSurname: lastSurname,
                            name: name,
                            email: email
                        }),
                        fromLoginActions.signInSuccess(),
                    ];
                }), operators_1.catchError(function (error) {
                    return rxjs_1.of(fromLoginActions.finishLoad(), fromLoginActions.signInFailure({ error: error }));
                }));
            }));
        });
        this.signInSuccessEffect$ = effects_1.createEffect(function () {
            return _this.action$.pipe(effects_1.ofType(fromLoginActions.signInSuccess), operators_1.exhaustMap(function (action) {
                return rxjs_1.from(_this.router.navigate(["/menu"])).pipe(operators_1.switchMap(function (result) {
                    return result
                        ? [fromLoginActions.finishLoad()]
                        : [fromLoginActions.signInFailure({ error: "No autorizado" })];
                }), operators_1.catchError(function (error) {
                    return rxjs_1.of(fromLoginActions.finishLoad(), fromLoginActions.signInFailure({ error: error }));
                }));
            }));
        });
        this.signInFailureEffect$ = effects_1.createEffect(function () {
            return _this.action$.pipe(effects_1.ofType(fromLoginActions.signInFailure), operators_1.tap(function (action) {
                console.error("Error en inicio de sesion: ", action.error);
                localStorage.clear();
            }));
        }, {
            dispatch: false
        });
        this.signOutEffect$ = effects_1.createEffect(function () {
            return _this.action$.pipe(effects_1.ofType(fromLoginActions.signOut), operators_1.exhaustMap(function (action) {
                return _this.auth.signOut().pipe(operators_1.switchMap(function (action) { return [fromUserActions.clearUser()]; }), operators_1.catchError(function (error) { return rxjs_1.of(fromLoginActions.signOutFailured({ error: error })); }));
            }));
        });
    }
    LoginEffects = __decorate([
        core_1.Injectable()
    ], LoginEffects);
    return LoginEffects;
}());
exports.LoginEffects = LoginEffects;
