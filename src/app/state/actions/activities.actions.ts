import { createAction, props } from "@ngrx/store";
import { Activity } from "src/app/shared/interfaces/activity";

export enum activitiesActionTypes{
    loadActivities = "[Activities View] Load activities ",
    LoadActivitiesSuccess = "[Activities View] Load activities success",
}

export const loadActivities = createAction(
    activitiesActionTypes.loadActivities
);

export const loadActivitiesSuccess = createAction(
    activitiesActionTypes.LoadActivitiesSuccess,
    props<{activities: Activity[]}>()
);