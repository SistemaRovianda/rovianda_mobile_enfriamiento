import { Component, OnInit } from "@angular/core";
import { HeaderInterface } from "src/app/shared/models/header.interface";

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

  constructor() {}

  ngOnInit() {}
}
