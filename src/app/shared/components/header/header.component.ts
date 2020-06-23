import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HeaderInterface } from "../../models/header.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() header: HeaderInterface;

  @Output() event = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {}

  onClick() {
    this.event.emit("click action");
    this.router.navigate([this.header.path]);
  }
}
