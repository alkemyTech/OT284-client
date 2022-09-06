import { ActionReducerMap } from "@ngrx/store";
import { OrganizationState } from "../shared/interfaces/organization.state";
import { userState } from "../shared/interfaces/users.state";
import { organizationReducer } from "./reducers/organization.reducer";
import { usersReducer } from "./reducers/users.reducer";
import { membersReducer } from "./reducers/members.reducer";
import { memberState } from "../shared/interfaces/members.state";

export interface AppState {
  organization: OrganizationState;
  users: userState;
  members: memberState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  organization: organizationReducer,
  users: usersReducer,
  members: membersReducer
};
