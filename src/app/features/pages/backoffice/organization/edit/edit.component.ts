import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AboutService } from "src/app/core/services/about.service";
import Base64UploaderPlugin from "customBuilder/Base64Upload";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  constructor(
    private organization: AboutService,
    private about: AboutService,
    private router: Router
  ) {}
  public Editor = ClassicEditor;
  logo: string;
  id: number;
  urlPattern = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";
  editorConfig = { extraPlugins: [Base64UploaderPlugin] };
  formOrganization = new FormGroup({
    name: new FormControl("", [Validators.required]),
    logo: new FormControl("", [Validators.required]),
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

  onSubmit() {
    const name = this.formOrganization.value.name;
    const logo = this.obtenerImg(this.formOrganization.value.logo);
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
          logo: logo,
          short_description: shortDesc,
          long_description: longDesc,
          facebook_url: facebook,
          linkedin_url: linkedin,
          instagram_url: instagram,
          twitter_url: twitter,
        })
        .subscribe({
          next: () => {
            Swal.fire({
              icon: "success",
              text: "Organizatión editado con éxito",
            }).then(() => this.router.navigateByUrl("backoffice/organization"));
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  private obtenerImg(image: string) {
    let str1 = image.split('src="')[1];
    return (image = str1.split('"')[0]);
  }

  ngOnInit(): void {
    this.organization.getOrganization().subscribe((data) => {
      this.logo = data.logo;
      this.id = data.id;
    });
  }
}
