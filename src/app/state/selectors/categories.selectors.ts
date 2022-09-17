import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CategoryState } from '../../shared/interfaces/category.state';

export const selectCategoriesFeature = (state: AppState) => state.categories;

export const selectCategories = createSelector(
    selectCategoriesFeature,
    (state: CategoryState) => state.categories
);

export const selectLoading = createSelector(
    selectCategoriesFeature,
    (state: CategoryState) => state.loading
);