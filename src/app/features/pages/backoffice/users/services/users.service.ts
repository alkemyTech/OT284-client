import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { merge, Observable } from "rxjs";
import { filter, distinct } from "rxjs/operators";
import { AppState } from "src/app/state/app.state";
import {
  selectUserError,
  selectUserSuccess,
} from "src/app/state/selectors/users.selectors";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  editUserData: any;
  userIsEditing = false;
  status: string;
  statusSuccess: string;
  userSuccess: Observable<any>;
  userError: Observable<any>;

  constructor(private store: Store<AppState>) {}

  selectorsUsers() {
    this.userSuccess = this.store.select(selectUserSuccess);

    this.userError = this.store.select(selectUserError);

    if (!this.status) {
      const new$ = this.userError.pipe(
        filter((a) => a !== null),
        distinct()
      );
      return new$.subscribe((data) => {
        this.status = data;
        console.log(this.status);
      });
    } else {
      const new$ = this.userSuccess.pipe(
        filter((a) => a !== null),
        distinct()
      );
      return new$.subscribe((data) => {
        this.status = data;
        console.log(this.status);
      });
    }
  }
}
