import { createReducer, on } from "@ngrx/store";
import { userData } from "src/app/shared/interfaces/userInterface";
import { userState } from "src/app/shared/interfaces/users.state";
import {
  createUserAction,
  createUserActionError,
  createUserActionSucess,
  editUserAction,
  editUserActionError,
  editUserActionSucess,
  loadedUsers,
  loadUsers,
} from "../actions/users.actions";

export const initialState: userState = {
  loading: false,
  users: {} as userData,
  error: null,
  success: null,
};

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, (state) => {
    return { ...state, loading: true };
  }),
  on(loadedUsers, (state, { users }) => {
    return { ...state, loading: false, users };
  }),
  on(createUserAction, (state, { body }) => {
    return { ...state, body };
  }),
  on(editUserAction, (state, { id }) => {
    return { ...state, id };
  }),
  on(createUserActionSucess, (state, {}) => {
    return { ...state, error: "success" };
  }),
  on(editUserActionSucess, (state, {}) => {
    return { ...state, error: "success" };
  }),
  on(createUserActionError, (state, { error }) => {
    return { ...state, error: error };
  }),
  on(editUserActionError, (state, { error }) => {
    return { ...state, error: error };
  })
);
