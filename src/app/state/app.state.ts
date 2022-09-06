import { ActionReducerMap } from "@ngrx/store";
import { OrganizationState } from "../shared/interfaces/organization.state";
import { userState } from "../shared/interfaces/users.state";
import { organizationReducer } from "./reducers/organization.reducer";
import { usersReducer } from "./reducers/users.reducer";

export interface AppState {
  organization: OrganizationState;
  users: userState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  organization: organizationReducer,
  users: usersReducer,
};
