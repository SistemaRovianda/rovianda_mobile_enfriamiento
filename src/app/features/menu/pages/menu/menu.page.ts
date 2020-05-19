import { Component, OnInit } from "@angular/core";
import { HeaderInterface } from "src/app/shared/models/header.interface";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/Models/app-state.interface";
import { signOut } from "src/app/features/landing/store/login/login.action";
import { stepperInit } from "../../store/stepper/stepper.actions";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {
  header: HeaderInterface = {
    namePath: "Salir",
    path: "/login",
  };

  section: string;

  constructor(
    private router: Router,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit() {
    this.store.dispatch(stepperInit());
  }

  nextSection() {
    this.router.navigate(["/" + this.section]);
    this.section = undefined;
  }

  logOut() {
    this.store.dispatch(signOut());
  }
}
