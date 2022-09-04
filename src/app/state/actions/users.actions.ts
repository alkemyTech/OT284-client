import { createAction, props } from "@ngrx/store";
import { userData } from "src/app/shared/interfaces/userInterface";

export enum UsersActionType {
  Loading = "[Users] Loading",
  LoadUsersSuccess = "[Users] Loaded Success",
  loadUsersFailure = "[Users] Loaded Failure",
  deleteUserAction = "[Users] Deleting User",
  deleteUserSucess = "[Users] User Deleted",
  creatingUser = "[User Create] Creating User",
  userCreated = "[User Create] User Created",
  EditingUser = "[User Edit] Editing User",
  userEdited = "[User Edit] User Edited",
}

export const loadUsers = createAction(
  UsersActionType.Loading,
  props<{ parameters: string; parametersRole: any }>()
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

export const createUserAction = createAction(
  UsersActionType.creatingUser,
  props<{ body: any }>()
);

export const createUserActionSucess = createAction(UsersActionType.userCreated);

export const editUserAction = createAction(
  UsersActionType.EditingUser,
  props<{ id: number; body: any }>()
);

export const editUserActionSucess = createAction(UsersActionType.userEdited);
