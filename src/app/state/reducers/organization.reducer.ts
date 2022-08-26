import { createReducer, on } from '@ngrx/store';
import { loadOrganization, loadedOrganization, loadMembers, loadedMembers } from '../actions/organization.actions';
import { OrganizationState } from '../../shared/interfaces/organization.state';
import { Organization } from '../../shared/interfaces/organization';
import { Member } from '../../shared/interfaces/member';

export const initialState: OrganizationState = { loading: false, organization: {} as Organization, members: {} as Member[] }

export const organizationReducer = createReducer(
  initialState,
  on(loadOrganization, (state) => {
    return { ...state, loading: true } 
  }),
  on(loadedOrganization, (state, {organization}) => {
    return { ...state, loading: false, organization } 
  }),
  on(loadMembers, (state) => {
    return { ...state, loading: true}
  }),
  on(loadedMembers, (state, {members}) => {
    return { ...state, loading: false, members }
  })
);