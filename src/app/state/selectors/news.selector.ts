import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { NewsState } from "../../shared/interfaces/news.state";

export const selectNewsFeature=(state: AppState)=>state.news

export const selectNews=createSelector(
    selectNewsFeature,
    (state: NewsState)=>state.news
);