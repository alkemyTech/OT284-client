import { createSelector } from '@ngrx/store';
import { SlidesState } from 'src/app/shared/interfaces/slides.state';
import { AppState } from '../app.state';

export const selectSlidesFeature = (state: AppState) => state.slides


export const selectListSlides = createSelector(
    selectSlidesFeature,
    (slides:SlidesState) => {
        return slides.slides
    }
);

export const selectSlidesLoading = createSelector(
    selectSlidesFeature,
    (slides:SlidesState) => {
        return slides.loading
    }
);