import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { MenuResolver } from "./shared/resolver/menu.resolver";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [MenuResolver],
})
export class AppRoutingModule {}
