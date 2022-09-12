import {createReducer, on} from '@ngrx/store';
import { NewsState } from 'src/app/shared/interfaces/news.state';
import { deletedNew, errorLoadedNews, loadedNews, loadNews } from '../actions/news.action';

export const initialState: NewsState = {loading:false, news:[], error:'', newDeleted:false}

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
    })
)