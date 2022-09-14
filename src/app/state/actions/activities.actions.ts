import { createAction, props } from "@ngrx/store";
import { Activity } from "src/app/shared/interfaces/activity";

export enum activitiesActionTypes{
    loadActivities = "[Activities View] Load activities ",
    LoadActivitiesSuccess = "[Activities View] Load activities success",
    addActivity= "[Backoffice Activities] add activity",
    addActivitySuccess = "[Backoffice Activities] add activity success",
}

export const loadActivities = createAction(
    activitiesActionTypes.loadActivities
);

export const loadActivitiesSuccess = createAction(
    activitiesActionTypes.LoadActivitiesSuccess,
    props<{activities: Activity[]}>()
);

export const addActivity = createAction(
    activitiesActionTypes.addActivity,
    props<{activity: Activity}>()
);

export const addActivitySuccess = createAction(
    activitiesActionTypes.addActivitySuccess,
    props<{message: string}>()
);