import { Component, OnInit } from "@angular/core";
import { HeaderInterface } from "src/app/shared/models/header.interface";

@Component({
  selector: "app-exit-lot",
  templateUrl: "./exit-lot.page.html",
  styleUrls: ["./exit-lot.page.scss"],
})
export class ExitLotPage implements OnInit {

  header: HeaderInterface = {
    namePath:"Regresar",
    path: "/menu"
  };

  constructor() {}

  ngOnInit() {}
}
