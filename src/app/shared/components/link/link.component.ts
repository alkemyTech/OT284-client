import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-link",
  templateUrl: "./link.component.html",
  styleUrls: ["./link.component.scss"],
})
export class LinkComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() routerLink: string;
  @Input() linkReference: string;
}
