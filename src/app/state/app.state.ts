import { ActionReducerMap } from "@ngrx/store";
import { activitiesState } from "../shared/interfaces/activities.state";
import { memberState } from "../shared/interfaces/members.state";
import { OrganizationState } from "../shared/interfaces/organization.state";
import { userState } from "../shared/interfaces/users.state";
import { activitiesReducer } from "./reducers/activities.reducer";
import { membersReducer } from "./reducers/members.reducer";
import { organizationReducer } from "./reducers/organization.reducer";
import { usersReducer } from "./reducers/users.reducer";

export interface AppState {
  organization: OrganizationState;
  users: userState;
  members: memberState;
  activities: activitiesState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  organization: organizationReducer,
  users: usersReducer,
  members: membersReducer,
  activities: activitiesReducer
};
