import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { StoreModule } from "@ngrx/store";

import { reducers, metaReducers } from "./features/store/index.reducer";

import { EffectsModule } from "@ngrx/effects";
import { effects } from "./features/store/index.effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { HttpClientModule } from "@angular/common/http";

const COMMON_DECLARATIONS = [AppComponent];

const COMMON_IMPORTS = [
  BrowserModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  StoreModule.forRoot(reducers, {
    metaReducers,
    runtimeChecks: {
      strictActionImmutability: true,
      strictStateImmutability: true,
    },
  }),
  EffectsModule.forRoot(effects),
  StoreDevtoolsModule.instrument({
    maxAge: 20,
  }),
  HttpClientModule,
];

const COMMON_PROVIDERS = [
  StatusBar,
  SplashScreen,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  entryComponents: [],
  imports: COMMON_IMPORTS,
  providers: COMMON_PROVIDERS,
  bootstrap: [AppComponent],
})
export class AppModule {}
