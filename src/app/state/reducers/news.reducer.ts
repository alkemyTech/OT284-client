import {createReducer, on} from '@ngrx/store';
import { newData } from 'src/app/features/pages/news/models/newM';
import { NewsState } from 'src/app/shared/interfaces/news.state';
import { createdNew, createNew, deletedNew, deleteNew, editedNew, editNew, errorLoadedNews, loadedNews, loadNews, receivedNew, searchNew, searchNewFailure, searchNewSuccess } from '../actions/news.action';

export const initialNew: newData={
    id: 0, name: "", slug: null, content: "", image: "", user_id: 0, category_id: 0,
    created_at: "", updated_at: "", deleted_at:'', group_id: null
}

export const initialState: NewsState = {loading:false, news:[], error:'', 
                                        newWasDeleted:false, newToDelete:initialNew, 
                                        newWasEdited:false, newToEdit: initialNew, 
                                        newWasCreated:false,newToCreate:initialNew}

export const newsReducer= createReducer(
    initialState,
    on(loadNews,(state)=>{
        return {...state, loading:true, error:''}
    }),
    on(loadedNews,(state, {news})=>{
        return {...state,loading:false, news}
    }),
    on(errorLoadedNews,(state, {message})=>{
        return {...state, loading:false, error:message}
    }),
    on(searchNew,(state)=>{
        return {...state,loading:true,error:''}
    }),
    on(searchNewSuccess,(state,{news})=>{
        return {...state,loading:false, news}
    }),
    on(searchNewFailure,(state,{message})=>{
        return {...state,loading:false,error:message}
    }),
    on(deleteNew,(state,{newToDelete})=>{
        return {...state, newToDelete}
    }),
    on(deletedNew, (state)=>{
        let newDeleted=state.newToDelete
        return {...state, news: state.news.filter(newM=>newM.id!==newDeleted.id), newWasDeleted:true}
    }),
    on(receivedNew,(state,{newToEdit})=>{
        return {...state, newToEdit}
    }),
    on(createNew,(state,{newToCreate})=>{
        return {...state,newToCreate}
    }),
    on(createdNew, (state)=>{
        let newCreated=state.newToCreate
        state.news.push(newCreated)
        return {...state,news:state.news, newWasCreated:true}
    }),
    on(editNew,(state,{newToEdit})=>{
        return {...state,newToEdit}
    }),
    on(editedNew, (state)=>{
        let newEdited=state.newToEdit;
        let index=state.news.findIndex(newM=>newM.id=newEdited.id);
        state.news[index]=newEdited;
        return {...state,news:state.news, newWasEdited:true}
    }),
)

/* export const formNewsReducer=createReducer(
    initialFormState,
    on(formValueChange,(state,{type, ...update})=>{
        return {...state,...update}
    })
)
export function reducer(state: NewsFormState | undefined, action: Action){
    return formNewsReducer(state,action)
} */