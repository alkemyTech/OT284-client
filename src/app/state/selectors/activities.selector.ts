import { createSelector } from '@ngrx/store';
import { activitiesState } from 'src/app/shared/interfaces/activities.state';
import { AppState } from '../app.state';

export const selectActivitiesFeature = (state: AppState) => state.activities;

export const selectActivities = createSelector(
    selectActivitiesFeature,
    (state : activitiesState) => state.activities
);
export const selectLoading = createSelector(
    selectActivitiesFeature,
    (state : activitiesState) => state.loading
);