import { createSelector } from "@ngrx/store";
import { userState } from "src/app/shared/interfaces/users.state";
import { AppState } from "../app.state";

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: userState) => state.users
);

export const selectUsersLoading = createSelector(
  selectUsersFeature,
  (state: userState) => state.loading
);

export const selectUserError = createSelector(
  selectUsersFeature,
  (state: userState) => state.error
);

export const selectUserSuccess = createSelector(
  selectUsersFeature,
  (state: userState) => state.success
);
