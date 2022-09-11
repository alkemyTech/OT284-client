import { createReducer, on } from "@ngrx/store";
import { activitiesState } from "src/app/shared/interfaces/activities.state";
import { Activity } from "src/app/shared/interfaces/activity";
import { loadActivities, loadActivitiesSuccess } from "../actions/activities.actions";

export const initialState: activitiesState = {
  activities: {} as Activity[],
  loading:false
};

export const activitiesReducer = createReducer(
  initialState,
  on(loadActivities, (state) => {
    return { ...state, loading:true };
  }),
  on(loadActivitiesSuccess, (state,{activities}) =>{
    return {...state, loading:false, activities }
  })
);