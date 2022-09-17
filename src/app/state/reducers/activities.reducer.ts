import { createReducer, on } from "@ngrx/store";
import { activitiesState } from "src/app/shared/interfaces/activities.state";
import { Activity } from "src/app/shared/interfaces/activity";
import { addActivity, addActivitySuccess, editActivity, editActivitySuccess, loadActivities, loadActivitiesSuccess } from "../actions/activities.actions";

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
  }),
  on(addActivity, (state,{activity}) => {
    return { ...state, activity };
  }),
  on(addActivitySuccess, (state,{message}) =>{
    return {...state, message }
  }),
  on(editActivity, (state,{data}) => {
    return { ...state, data };
  }),
  on(editActivitySuccess, (state,{message}) =>{
    return {...state, message }
  }),
);