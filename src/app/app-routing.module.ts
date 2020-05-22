import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { IsAuthenticatedGuard } from "./shared/guards/is_authenticated.guard";
import { AuthGuard } from "./shared/guards/auth.guard";
import { MenuResolver } from "./shared/resolver/menu.resolver";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () =>
      import("./features/landing/pages/login/login.module").then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: "menu",
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./features/menu/pages/open-lot/open-lot.module").then(
        (m) => m.OpenLotPageModule
      )
  },
  {
    path: "close-lot",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./features/menu/pages/close-lot/close-lot.module").then(
        (m) => m.CloseLotPageModule
      )
  },
  {
    path: "exit-lot",
    canActivate: [AuthGuard],
    data: { status: "CLOSED" },
    loadChildren: () =>
      import("./features/menu/pages/exit-lot/exit-lot.module").then(
        (m) => m.ExitLotPageModule
      )
  },
  {
    path: "report",
    canActivate: [AuthGuard],
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
