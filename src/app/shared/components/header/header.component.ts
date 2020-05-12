import { Component, OnInit, Input } from "@angular/core";
import { HeaderInterface } from "../../models/header.interface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() header: HeaderInterface;

  constructor() {}

  ngOnInit() {}
}
