import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AboutService } from "src/app/core/services/about.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  constructor(
    private organization: AboutService,
    private about: AboutService
  ) {}
  public Editor = ClassicEditor;
  logo: string;
  id: number;
  urlPattern = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
  formOrganization = new FormGroup({
    name: new FormControl("", [Validators.required]),
    logo: new FormControl("", [Validators.required, this.validExtensions]),
    shortDesc: new FormControl("", [Validators.required]),
    longDesc: new FormControl("", [Validators.required]),
    facebook: new FormControl("", [
      Validators.required,
      Validators.pattern(this.urlPattern),
    ]),
    linkedin: new FormControl("", [
      Validators.required,
      Validators.pattern(this.urlPattern),
    ]),
    instagram: new FormControl("", [
      Validators.required,
      Validators.pattern(this.urlPattern),
    ]),
    twitter: new FormControl("", [
      Validators.required,
      Validators.pattern(this.urlPattern),
    ]),
  });

  validExtensions(control: AbstractControl) {
    if (control.value.includes(".jpg") || control.value.includes(".png")) {
      return null;
    } else {
      return { forbbidenExtension: true };
    }
  }

  onSubmit() {
    const name = this.formOrganization.value.name;
    const logo = this.formOrganization.value.logo;
    const shortDesc = this.formOrganization.value.shortDesc;
    const longDesc = this.formOrganization.value.longDesc;
    const facebook = this.formOrganization.value.facebook;
    const linkedin = this.formOrganization.value.linkedin;
    const instagram = this.formOrganization.value.instagram;
    const twitter = this.formOrganization.value.twitter;

    if (this.formOrganization.valid) {
      this.about
        .putOrganization(this.id, {
          name: name,
          short_description: shortDesc,
          long_description: longDesc,
          facebook_url: facebook,
          linkedin_url: linkedin,
          instagram_url: instagram,
          twitter_url: twitter,
        })
        .subscribe((data) => {
          console.log(data);
        });
    }
  }

  ngOnInit(): void {
    this.organization.getOrganization().subscribe((data) => {
      this.logo = data.logo;
      this.id = data.id;
    });
  }
}
