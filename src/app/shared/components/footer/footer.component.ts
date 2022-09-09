import { Component, OnInit } from "@angular/core";
import { AboutService } from "src/app/core/services/about.service";
import { Organization } from "../../interfaces/organization";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  orgData: Organization;

  constructor(private organization: AboutService) {}

  ngOnInit(): void {
    this.organization.getOrganization().subscribe((data) => {
      this.orgData = data;
    });
  }
}
