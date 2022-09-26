import { createReducer, on } from "@ngrx/store";
import { activitiesState } from "src/app/shared/interfaces/activities.state";
import { Activity } from "src/app/shared/interfaces/activity";
import { addActivitiesError, addActivity, addActivitySuccess, deleteActivity, deleteActivitySuccess, editActivitiesError, editActivity, editActivitySuccess, loadActivities, loadActivitiesError, loadActivitiesSuccess } from "../actions/activities.actions";

export const initialState: activitiesState = {
  activities: {} as Activity[],
  loading:false,
  error:""
};

export const activitiesReducer = createReducer(
  initialState,
  on(loadActivities, (state) => {
    return { ...state, loading:true };
  }),
  on(loadActivitiesSuccess, (state,{activities}) =>{
    return {...state, loading:false, activities }
  }),
  on(addActivity, (state) => {
    return { ...state};
  }),
  on(loadActivitiesError, (state,{error}) =>{
    return {...state, loading:false, error }
  }),
  on(addActivity, (state,{activity}) => {
    return { ...state, activity };
  }),
  on(addActivitySuccess, (state,{activity}) =>{
    return {...state, activities: [...state.activities, activity] }
  }),
  on(editActivity, (state) => {
    return { ...state};
  }),
  on(addActivitiesError, (state,{error}) =>{
    return {...state, loading:false, error }
  }),
  on(editActivity, (state,{id,data}) => {
    return { ...state, data };
  }),
  on(editActivitySuccess, (state,{activity}) =>{
    const activities = state.activities.map((item :any) =>{
      let nActivity = {} as Activity 
      item.id === activity.id ? nActivity = activity : nActivity = item
      return nActivity
    })
    return { ...state, activities };
  }),
  on(deleteActivity, (state,{id}) => {
    const activities = state.activities.filter((activity: any) => activity.id !== id);
    return { ...state, activities };
  }),
  on(deleteActivitySuccess, (state,{message}) =>{
    return {...state, message }
  }),
  on(editActivitiesError, (state,{error}) =>{
    return {...state, loading:false, error }
  }),
);