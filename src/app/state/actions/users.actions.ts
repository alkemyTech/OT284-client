import { createAction, props } from "@ngrx/store";
import { userData } from "src/app/shared/interfaces/userInterface";

export enum UsersActionType {
  Loading = "[Users] Loading",
  LoadUsersSuccess = "[Users] Loaded Success",
  loadUsersFailure = "[Users] Loaded Failure",
  deleteUserAction = "[Users] Deleting User",
  deleteUserSucess = "[Users] User Deleted",
}

export const loadUsers = createAction(
  UsersActionType.Loading,
  props<{ parameters: string; parametersRole: number }>()
);

export const loadedUsers = createAction(
  UsersActionType.LoadUsersSuccess,
  props<{ users: userData }>()
);

export const deleteUserAction = createAction(
  UsersActionType.deleteUserAction,
  props<{ parameters: number }>()
);
export const deleteUserActionSuccess = createAction(
  UsersActionType.deleteUserSucess
);
