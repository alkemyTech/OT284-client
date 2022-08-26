import { createReducer, on } from '@ngrx/store';
import { loadOrganization, loadedOrganization } from '../actions/organization.actions';
import { OrganizationState } from '../../shared/interfaces/organization.state';
import { Organization } from '../../shared/interfaces/organization';

export const initialState: OrganizationState = { loading: false, organization: {} as Organization }

export const organizationReducer = createReducer(
  initialState,
  on(loadOrganization, (state) => {
    return { ...state, loading: true } 
  }),
  on(loadedOrganization, (state, {organization}) => {
    return { ...state, loading: false, organization } 
  })
);