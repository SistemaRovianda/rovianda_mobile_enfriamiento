import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { IsAuthenticatedGuard } from "./shared/guards/is_authenticated.guard";
import { AuthGuard } from "./shared/guards/auth.guard";
import { LotsResolver } from "./shared/resolver/lots.resolver";
import { MenuResolver } from "./shared/resolver/menu.resolver";
import { ProductResolver } from "./shared/resolver/product.resolver";

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
    data: { status: "PENDING" },
    loadChildren: () =>
      import("./features/menu/pages/open-lot/open-lot.module").then(
        (m) => m.OpenLotPageModule
      ),
    resolve: {
      lots: LotsResolver,
      product: ProductResolver,
    },
  },
  {
    path: "close-lot",
    canActivate: [AuthGuard],
    data: { status: "OPENED" },
    loadChildren: () =>
      import("./features/menu/pages/close-lot/close-lot.module").then(
        (m) => m.CloseLotPageModule
      ),
    resolve: {
      lots: LotsResolver,
      product: ProductResolver,
    },
  },
  {
    path: "exit-lot",
    canActivate: [AuthGuard],
    data: { status: "CLOSED" },
    loadChildren: () =>
      import("./features/menu/pages/exit-lot/exit-lot.module").then(
        (m) => m.ExitLotPageModule
      ),
    resolve: {
      lots: LotsResolver,
      product: ProductResolver,
    },
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
  providers: [LotsResolver, MenuResolver, ProductResolver],
})
export class AppRoutingModule {}
