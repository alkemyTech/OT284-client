import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { NewsState } from "../../shared/interfaces/news.state";

export const selectNewsFeature=(state: AppState)=>state.news

export const selectNews=createSelector(
    selectNewsFeature,
    (state: NewsState)=>state.news
);

export const selectLoadingNews=createSelector(
    selectNewsFeature,
    (state:NewsState)=>state.loading
)

export const selectErrorNews=createSelector(
    selectNewsFeature,
    (state:NewsState)=>state.error
)

export const selectNewToEdit=createSelector(
    selectNewsFeature,
    (state:NewsState)=>state.newToEdit
)
export const selectResponse=createSelector(
    selectNewsFeature,
    (state:NewsState)=>state.responseCreateEdit
)