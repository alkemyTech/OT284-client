import { Component, OnInit } from "@angular/core";
import { AboutService } from "src/app/core/services/about.service";
import { Organization } from "src/app/shared/interfaces/organization";

@Component({
  selector: "app-organization",
  templateUrl: "./organization.component.html",
  styleUrls: ["./organization.component.scss"],
})
export class OrganizationComponent implements OnInit {
  constructor(private organization: AboutService) {}

  orgData: Organization;

  ngOnInit(): void {
    this.organization.getOrganization().subscribe((data) => {
      this.orgData = data;
      this.orgData.short_description = this.orgData.short_description.replace(
        /<\/?[^>]+>/gi,
        ""
      );
    });
  }
}
