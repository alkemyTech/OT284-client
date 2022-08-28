import { ActionReducerMap } from '@ngrx/store';
import { OrganizationState } from '../shared/interfaces/organization.state';
import { organizationReducer } from './reducers/organization.reducer';

export interface AppState {
    organization: OrganizationState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    organization: organizationReducer
}