import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { OrganizationState } from '../../shared/interfaces/organization.state';

export const selectOrganizationFeature = (state: AppState) => state.organization;

export const selectOrganization = createSelector(
    selectOrganizationFeature,
    (state: OrganizationState) => state.organization
);

export const selectLoading = createSelector(
    selectOrganizationFeature,
    (state: OrganizationState) => state.loading
);