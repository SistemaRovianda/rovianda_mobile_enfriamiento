import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { MenuResolver } from "./shared/resolver/menu.resolver";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./features/landing/pages/login/login.module").then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: "menu",
    loadChildren: () =>
      import("./features/menu/pages/menu/menu.module").then(
        (m) => m.MenuPageModule
      ),
    resolve: {
      menu: MenuResolver,
    },
  },
  {
    path: "open-lot",
    loadChildren: () =>
      import("./features/menu/pages/open-lot/open-lot.module").then(
        (m) => m.OpenLotPageModule
      ),
  },
  {
    path: "close-lot",
    loadChildren: () =>
      import("./features/menu/pages/close-lot/close-lot.module").then(
        (m) => m.CloseLotPageModule
      ),
  },
  {
    path: "exit-lot",
    loadChildren: () =>
      import("./features/menu/pages/exit-lot/exit-lot.module").then(
        (m) => m.ExitLotPageModule
      ),
  },
  {
    path: "report",
    loadChildren: () =>
      import("./features/menu/pages/report/report.module").then(
        (m) => m.ReportPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [MenuResolver],
})
export class AppRoutingModule {}
