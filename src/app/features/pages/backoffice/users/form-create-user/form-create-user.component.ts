import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NewsUsersService } from "../services/newsUsers.service";
import { UsersService } from "../services/users.service";

@Component({
  selector: "app-form-create-user",
  templateUrl: "./form-create-user.component.html",
  styleUrls: ["./form-create-user.component.scss"],
})
export class FormCreateUserComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(private http: NewsUsersService, public user: UsersService) {}

  formUser = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
    role_id: new FormControl("", Validators.required),
    profilePic: new FormControl("", [
      Validators.required,
      this.validExtensions,
    ]),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
    ]),
  });
  id: number;

  @ViewChild("email", { static: false }) email: ElementRef;
  @ViewChild("name", { static: false }) name: ElementRef;
  @ViewChild("password", { static: false }) password: ElementRef;

  validExtensions(control: AbstractControl) {
    if (control.value.includes(".jpg") || control.value.includes(".png")) {
      return null;
    } else {
      return { forbbidenExtension: true };
    }
  }

  onSubmit() {
    const url = "https://ongapi.alkemy.org/api/users";
    const name = this.formUser.value.name;
    const email = this.formUser.value.email;
    const role_id = Number(this.formUser.value.role_id);
    const password = this.formUser.value.password;

    const id = this.user.editUserData.id;

    if (this.formUser.valid) {
      if (this.user.editUserData.id == "") {
        this.http
          .post(url, {
            name: name,
            email: email,
            role_id: role_id,
            password: password,
          })
          .subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (error) => {
              console.log(error.message, "error");
            },
          });
      } else {
        this.http
          .put(url, id, {
            name: name,
            email: email,
            role_id: role_id,
            password: password,
          })
          .subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (error) => {
              console.log(error.message, role_id);
            },
          });
      }
    }
  }

  ngAfterViewInit(): void {
    this.name.nativeElement.value = this.user.editUserData.name;
    this.email.nativeElement.value = this.user.editUserData.email;
    this.password.nativeElement.value = this.user.editUserData.password;
  }

  ngOnDestroy(): void {
    this.user.editUserData = {
      id: "",
      name: "",
      email: "",
      password: "",
      role_id: "",
    };
  }

  ngOnInit(): void {}
}
