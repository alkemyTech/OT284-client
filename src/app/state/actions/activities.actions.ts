import { createAction, props } from "@ngrx/store";
import { Activity } from "src/app/shared/interfaces/activity";

export enum activitiesActionTypes{
    loadActivities = "[Activities View] Load activities ",
    loadActivitiesSuccess = "[Activities View] Load activities success",
    addActivity= "[Backoffice Activities] add activity",
    addActivitySuccess = "[Backoffice Activities] add activity success",
    editActivity= "[Backoffice Activities] edit activity",
    editActivitySuccess = "[Backoffice Activities] edit activity success",
    deleteActivity= "[Backoffice Activities] delete activity",
    deleteActivitySuccess = "[Backoffice Activities] delete activity success",
}

export const loadActivities = createAction(
    activitiesActionTypes.loadActivities
);

export const loadActivitiesSuccess = createAction(
    activitiesActionTypes.loadActivitiesSuccess,
    props<{activities: Activity[]}>()
);

export const addActivity = createAction(
    activitiesActionTypes.addActivity,
    props<{activity: Activity}>()
);

export const addActivitySuccess = createAction(
    activitiesActionTypes.addActivitySuccess,
    props<{activity: Activity}>()
);
export const editActivity = createAction(
    activitiesActionTypes.editActivity,
    props<{id: number,data: any}>()
);

export const editActivitySuccess = createAction(
    activitiesActionTypes.editActivitySuccess,
    props<{activity: Activity}>()
);
export const deleteActivity = createAction(
    activitiesActionTypes.deleteActivity,
    props<{id: number}>()
);

export const deleteActivitySuccess = createAction(
    activitiesActionTypes.deleteActivitySuccess,
    props<{message: string}>()
);