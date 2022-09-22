import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, of } from "rxjs";
import { map, mergeMap, catchError, switchMap } from "rxjs/operators";
import { NewsUsersService } from "src/app/core/services/newsUsers.service";
import { userData } from "src/app/shared/interfaces/userInterface";
import { environment } from "src/environments/environment";
import {
  createUserAction,
  createUserActionError,
  createUserActionSucess,
  deleteUserAction,
  deleteUserActionSuccess,
  editUserAction,
  editUserActionError,
  editUserActionSucess,
  loadedUsers,
  loadUsers,
} from "../actions/users.actions";

@Injectable()
export class UsersEffects {
  loadUsersSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap((action) =>
        this.user.getSearch(action.parameters, action.parametersRole).pipe(
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
        this.user.delete(action.parameters).pipe(
          map(() => deleteUserActionSuccess()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUserAction),
      switchMap((action) =>
        this.user.post(action.body).pipe(
          map((data: any) => {
            return createUserActionSucess(data);
          }),
          catchError((error) => {
            return of(createUserActionError(error));
          })
        )
      )
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUserAction),
      mergeMap((action) =>
        this.user.put(action.id, action.body).pipe(
          map((data: any) => editUserActionSucess(data)),
          catchError((error) => of(editUserActionError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private user: NewsUsersService,
    private router: Router
  ) {}
}
