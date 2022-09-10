import {createReducer, on} from '@ngrx/store';
import { newData } from 'src/app/features/pages/news/models/newM';
import { NewsState } from 'src/app/shared/interfaces/news.state';
import { loadedNews, loadNews } from '../actions/news.action';

export const initialState: NewsState = {loading:false, news:[]}

export const newsReducer= createReducer(
    initialState,
    on(loadNews,(state)=>{
        return {...state, loading:true}
    }),
    on(loadedNews,(state, {news})=>{
        return {...state,loading:false, news}
    })
)