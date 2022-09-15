import { createAction,props } from "@ngrx/store";
import { newData, Novedad } from "src/app/features/pages/news/models/newM";

export const NEWS_LOAD='[News List] Load News';
export const NEWS_LOADED= '[News List] Loaded News';
export const NEWS_LOAD_FAILURE='[News List] Not Loaded News';

export const NEW_DELETE_ALERT='[News List] Alert Delete New';
export const NEW_NOT_DELETE='[News List] Not Deleted New'
export const NEW_DELETE='[News List] Delete New';
export const NEW_DELETED='[News List] Deleted New';
export const NEW_DELETE_FAILURE='[News List] Error delete New';

export const NEW_CREATE='[News Form] Create New';
export const NEW_CREATED='[News Form] Created New';
export const NEW_CREATE_FAILURE='[News Form] Error Create New';

export const NEW_EDIT='[News Form] Edit New';
export const NEW_EDITED='[News Form] Edited New';
export const NEW_EDIT_FAILURE='[News Form] Error Edite New';
export const NEW_GET='[News Form] Get New';
export const NEW_FORM_CHANGE='[News Form] Validate New to Edit';
export const NEW_RECEIVED='[News Form] Received New';
export const NEW_NOT_RECEIVED='[News Form] Not Received New';

//ACCIONES NEWS-LIST 
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

export const deleteNew=createAction(
    NEW_DELETE,
    props<{newToDelete:newData}>()
)

export const deletedNew=createAction(
    NEW_DELETED,
)

export const errorDeleteNew=createAction(
    NEW_DELETE_FAILURE,
    props<{message:string}>()
)

//ACCIONES NEWS-FORM. PARA CREAR

export const createNew=createAction(
    NEW_CREATE,
    props<{newToCreate:Novedad}>()
)

export const createdNew=createAction(
    NEW_CREATED,
    props<{newCreated:newData}>()
)

export const errorCreateNew=createAction(
    NEW_CREATE_FAILURE,
    props<{message:string}>()
)

//ACCIONES NEWS-FORM. PARA EDITAR
export const editNew=createAction(
    NEW_EDIT,
    props<({newToEdit:newData})>()
)

export const editedNew=createAction(
    NEW_EDITED,
    props<{newEdited:newData}>()
)

export const errorEditedNew=createAction(
    NEW_EDIT_FAILURE,
    props<{message:string}>()
)

export const getNew=createAction(
    NEW_GET,
    props<({id:number})>()
)

export const receivedNew=createAction(
    NEW_RECEIVED,
    props<{newToEdit:newData}>()
)

export const errorReceivedNew=createAction(
    NEW_NOT_RECEIVED
)