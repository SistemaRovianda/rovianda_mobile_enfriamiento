import { Component, OnInit } from "@angular/core";
import { HeaderInterface } from "src/app/shared/models/header.interface";
import { Router } from "@angular/router";

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

  constructor(private router: Router) {}

  ngOnInit() {}

  nextSection() {
    console.log(this.section);

    this.router.navigate(["/" + this.section]);
    this.section = undefined;
  }
}
