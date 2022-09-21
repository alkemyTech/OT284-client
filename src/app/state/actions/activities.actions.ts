import { createAction, props } from "@ngrx/store";
import { Activity } from "src/app/shared/interfaces/activity";

export enum activitiesActionTypes{
    loadActivities = "[Activities View] Load activities ",
    loadActivitiesSuccess = "[Activities View] Load activities success",
    loadActivitiesError = "[Activities View] Load activities error",
    addActivity= "[Backoffice Activities] add activity",
    addActivitySuccess = "[Backoffice Activities] add activity success",
    editActivity= "[Backoffice Activities] edit activity",
    editActivitySuccess = "[Backoffice Activities] edit activity success",
}

export const loadActivities = createAction(
    activitiesActionTypes.loadActivities
);

export const loadActivitiesSuccess = createAction(
    activitiesActionTypes.loadActivitiesSuccess,
    props<{activities: Activity[]}>()
);

export const loadActivitiesError = createAction(
    activitiesActionTypes.loadActivitiesError,
    props<{error: string}>()
);

export const addActivity = createAction(
    activitiesActionTypes.addActivity,
    props<{activity: Activity}>()
);

export const addActivitySuccess = createAction(
    activitiesActionTypes.addActivitySuccess,
    props<{message: string}>()
);
export const editActivity = createAction(
    activitiesActionTypes.editActivity,
    props<{id: number,data: any}>()
);

export const editActivitySuccess = createAction(
    activitiesActionTypes.editActivitySuccess,
    props<{message: string}>()
);