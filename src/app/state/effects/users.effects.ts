import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { NewsUsersService } from "src/app/core/services/newsUsers.service";
import { userData } from "src/app/shared/interfaces/userInterface";
import { environment } from "src/environments/environment";
import {
  deleteUserAction,
  deleteUserActionSuccess,
  loadedUsers,
  loadUsers,
} from "../actions/users.actions";

@Injectable()
export class UsersEffects {
  loadUsersSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap((action) =>
        this.user
          .getSearch(environment.url, action.parameters, action.parametersRole)
          .pipe(
            map((users: any) => loadedUsers({ users })),
            catchError(() => EMPTY)
          )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserAction),
      mergeMap((action) =>
        this.user.delete(environment.url, action.parameters).pipe(
          map(() => deleteUserActionSuccess()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private user: NewsUsersService) {}
}
