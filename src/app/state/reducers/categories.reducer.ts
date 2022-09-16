import { CategoryState } from '../../shared/interfaces/category.state';
import { Category } from '../../shared/interfaces/category';
import { createReducer, on } from '@ngrx/store';
import { loadCategories, loadedCategories, deleteCategory, getCategoryById } from '../actions/categories.actions';


export const initialState: CategoryState = { loading: false, categories: {} as Category[] }

export const categoriesReducer = createReducer(
    initialState,
    on(loadCategories, (state) => {
        return { ...state, loading: true }
    }),
    on(loadedCategories, (state, {categories}) => {
        return { ...state, loading: false, categories }
    }),
    on(deleteCategory, (state, { id }) => {
        const updatedCategories = state.categories.filter((category) => category.id !== id);
        return { ...state, categories: updatedCategories }
    }),
    on(getCategoryById, (state, { id }) => {
        const updatedCategories = state.categories.filter((category) => category.id == id);
        return { ...state, categories: updatedCategories }
    })
)