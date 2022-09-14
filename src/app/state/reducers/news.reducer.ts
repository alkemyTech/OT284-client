import {createReducer, on} from '@ngrx/store';
import { newData } from 'src/app/features/pages/news/models/newM';
import { NewsState } from 'src/app/shared/interfaces/news.state';
import { deletedNew, errorLoadedNews, loadedNews, loadNews, receivedNew } from '../actions/news.action';

export const initialND: newData={
    id: 0, name: "", slug: null, content: "", image: "", user_id: 0, category_id: 0,
    created_at: "", updated_at: "", deleted_at: null, group_id: null
}
export const initialState: NewsState = {loading:false, news:[], error:'', newDeleted:false, newToEdit: initialND}

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
    on(deletedNew, (state,{newDeleted})=>{
        return {...state, news: state.news.filter(newM=>newM.id!==newDeleted.id), newDeleted:true}
    }),
    on(receivedNew,(state,{newToEdit})=>{
        return {...state, newToEdit}
    })
)