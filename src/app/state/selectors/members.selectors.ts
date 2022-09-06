import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectMembersFeature = (state: AppState) => state.members;

