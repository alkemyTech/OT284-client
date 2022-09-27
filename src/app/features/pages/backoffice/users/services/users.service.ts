import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { defaultIfEmpty, skip, skipWhile } from "rxjs/operators";
import { AppState } from "src/app/state/app.state";
import { selectUserError } from "src/app/state/selectors/users.selectors";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  editUserData: any;
  userIsEditing = false;
  userError$ = this.store.select(selectUserError).pipe();
  userData: string;
  constructor(private router: Router, private store: Store<AppState>) {}

  handleErrors(editorCreate: boolean) {
    this.userError$.subscribe((data) => {
      this.userData = data;
    });

    setTimeout(() => {
      if (this.userData === "error") {
        Swal.fire({
          icon: "error",
          text: "El e-mail ya está en uso.",
        });
      } else if (this.userData === "success") {
        Swal.fire({
          icon: "success",
          text: editorCreate
            ? "Usuario editado con éxito"
            : "Usuario creado con éxito",
        }).then(() => this.router.navigateByUrl("backoffice/users"));
      }
    }, 2000);
  }
}
