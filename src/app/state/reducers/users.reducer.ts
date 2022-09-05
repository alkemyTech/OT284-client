import { createReducer, on } from "@ngrx/store";
import { userData } from "src/app/shared/interfaces/userInterface";
import { userState } from "src/app/shared/interfaces/users.state";
import { loadedUsers, loadUsers } from "../actions/users.actions";

export const initialState: userState = {
  loading: false,
  users: {} as userData,
};

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, (state) => {
    return { ...state, loading: true };
  }),
  on(loadedUsers, (state, { users }) => {
    return { ...state, loading: false, users };
  })
);
