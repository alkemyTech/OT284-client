import { createAction,props } from "@ngrx/store";
import { newData } from "src/app/features/pages/news/models/newM";

export const NEWS_LOAD='[News List] Load News';
export const NEWS_LOADED= '[News List] Loaded News';
export const NEWS_LOAD_FAILURE='[News List] Not Loaded News';

export const NEW_DELETE_ALERT='[News List] Alert Delete New';
export const NEW_NOT_DELETE='[News List] Not Deleted New'
export const NEW_DELETE='[News List] Delete New';
export const NEW_DELETED='[News List] Deleted New';
export const NEW_DELETE_FAILURE='[News List] Error delete New';

export const loadNews=createAction(
    NEWS_LOAD
);

export const loadedNews=createAction(
    NEWS_LOADED,
    props<{news:newData[]}>()
)

export const errorLoadedNews=createAction(
    NEWS_LOAD_FAILURE,
    props<{message:string}>()
)

export const alertDelete=createAction(
    NEW_DELETE_ALERT,
    props<{newToDelete:newData}>()
)

export const notDelete=createAction(
    NEW_NOT_DELETE
)

export const deleteNew=createAction(
    NEW_DELETE,
    props<{newToDelete:newData}>()
)

export const deletedNew=createAction(
    NEW_DELETED,
    props<{newDeleted:newData}>()
)

export const errorDeleteNew=createAction(
    NEW_DELETE_FAILURE
)

)