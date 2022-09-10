import { createAction,props } from "@ngrx/store";
import { newData } from "src/app/features/pages/news/models/newM";

export const loadNews=createAction(
    '[News List] Load News'
);

export const loadedNews=createAction(
    '[News List] Loaded News',
    props<{news:newData[]}>()
)

export const errorLoadedNews=createAction(
    '[News List] Not Loaded News',
    props<{message:string}>()
)