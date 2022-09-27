import { createReducer, on } from '@ngrx/store';
import { Slides } from 'src/app/shared/interfaces/slides';
import { SlidesState } from 'src/app/shared/interfaces/slides.state';
import { loadedSlides, loadSlides } from '../actions/slides.action';

export const initialState: SlidesState = { loading: false, slides: [] };

export const slidesReducer = createReducer(
    initialState,
    on(loadSlides, (state) => {
        return { ...state, loading: true }
    }),
    on(loadedSlides, (state, {slides}) => {
        return { ...state, loading: false, slides }
    })
);