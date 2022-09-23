import { createSelector } from '@ngrx/store';
import { memberState } from 'src/app/shared/interfaces/members.state';
import { AppState } from '../app.state';

export const selectMembersFeature = (state: AppState) => state.members;

export const selectMembers = createSelector(
    selectMembersFeature,
    (state : memberState) => state.members
);

export const selectMembersLoading = createSelector(
    selectMembersFeature,
    (state : memberState) => state.loading
);

export const selectMember = createSelector(
    selectMembersFeature,
    (state: memberState) => state.member
)