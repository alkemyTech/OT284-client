import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UsersService } from "../services/users.service";
import { FormMapService } from "./form-map/form-map.service";
import { MatDialog } from "@angular/material/dialog";
import { FormMapComponent } from "./form-map/form-map.component";
import { TermsAndConditionsComponent } from "./terms-and-conditions/terms-and-conditions.component";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/state/app.state";
import {
  createUserAction,
  editUserAction,
} from "src/app/state/actions/users.actions";

import { Router } from "@angular/router";

@Component({
  selector: "app-form-create-user",
  templateUrl: "./form-create-user.component.html",
  styleUrls: ["./form-create-user.component.scss"],
})
export class FormCreateUserComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(
    public user: UsersService,
    private formMap: FormMapService,
    public dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router
  ) {}

  formUser = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
    role_id: new FormControl("", Validators.required),
    profilePic: new FormControl("", [
      Validators.required,
      this.validExtensions,
    ]),

    address: new FormControl("", Validators.required),
  });
  confirmedAddress = false;
  acceptedTerms = false;
  status: string;

  validExtensions(control: AbstractControl) {
    if (control.value.includes(".jpg") || control.value.includes(".png")) {
      return null;
    } else {
      return { forbbidenExtension: true };
    }
  }

  openDialog(): void {
    this.formMap.mapAddress = this.formUser.value.address;
    const dialogRef = this.dialog
      .open(FormMapComponent, {
        width: "550px",
        height: "550px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.confirmedAddress = true;
        }
      });
  }

  showTerms(): void {
    const dialogRef = this.dialog.open(TermsAndConditionsComponent, {
      width: "750px",
    });
  }

  showOptions(event: MatCheckboxChange): void {
    if (event.checked) {
      this.acceptedTerms = true;
    } else {
      this.acceptedTerms = false;
    }
  }

  isDisabled(): boolean {
    return !(this.formUser.valid &&
    this.confirmedAddress &&
    this.user.userIsEditing
      ? true
      : this.acceptedTerms);
  }

  onSubmit() {
    if (this.formUser.valid && this.confirmedAddress) {
      if (!this.user.editUserData) {
        this.store.dispatch(
          createUserAction({
            body: {
              name: this.formUser.value.name,
              email: this.formUser.value.email,
              role_id: Number(this.formUser.value.role_id),
              password: this.formUser.value.password,
              latitude: this.formMap.lat,
              longitude: this.formMap.long,
            },
          })
        );
      } else {
        this.store.dispatch(
          editUserAction({
            id: this.user.editUserData.id,
            body: {
              name: this.formUser.value.name,
              email: this.formUser.value.email,
              role_id: Number(this.formUser.value.role_id),
              password: this.formUser.value.password,
              latitude: this.formMap.lat,
              longitude: this.formMap.long,
            },
          })
        );
      }

      this.user.selectorsUsers();

      console.log(this.user.status);
      setTimeout(() => {
        if (this.user.status === "User saved successfully") {
          this.router.navigateByUrl("backoffice/users");
        }
      }, 2000);
    }
  }

  ngAfterViewInit(): void {
    if (this.user.editUserData) {
      this.formUser.controls.name.setValue(this.user.editUserData.name);
      this.formUser.controls.email.setValue(this.user.editUserData.email);
      this.formUser.controls.password.setValue(this.user.editUserData.password);
    }
  }

  ngOnDestroy(): void {
    delete this.user.editUserData;
    this.user.userIsEditing = false;
    this.user.status = "";
  }

  ngOnInit(): void {}
}
