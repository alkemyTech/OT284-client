import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  constructor() {}
  public Editor = ClassicEditor;
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
    if (this.formOrganization.valid) {
      console.log("form válida", this.formOrganization);
    } else {
      console.log("form inválida", this.formOrganization);
    }
  }

  ngOnInit(): void {}
}
