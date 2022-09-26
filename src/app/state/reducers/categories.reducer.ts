import { CategoryState } from '../../shared/interfaces/category.state';
import { Category } from '../../shared/interfaces/category';
import { createReducer, on } from '@ngrx/store';
import { loadCategories, loadedCategories, deleteCategory, getCategoryById, searchCategorySuccess, searchCategory, createCategoryError, createdCategory, createCategory, editCategoryError, editCategory, editedCategory } from '../actions/categories.actions';


export const initialState: CategoryState = { loading: false, categories: {} as Category[], categoriesResults: {} as Category[], error: null }

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
    }),
    on(searchCategory, (state) => {
        return { ...state, loading: true }
    }),
    on(searchCategorySuccess, (state, {categories}) => {
        return { ...state, categoriesResults: categories, loading: false }
    }),
    on(createCategoryError, (state, { error }) => {
        return { ...state, error: error }
    }),
    on(createdCategory, (state) => {
        return { ...state, error: null }
    }),
    on(createCategory, (state) => {
        return { ...state, error: null }
    }),
    on(editCategoryError, (state, { error }) => {
        return { ...state, error: error }
    }),
    on(editCategory, (state) => {
        return { ...state, error: null }
    }),
    on(editedCategory, (state) => {
        return { ...state, error: null }
    }),
)