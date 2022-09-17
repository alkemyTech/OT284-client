import { createAction, props } from '@ngrx/store';
import { Category } from '../../shared/interfaces/category';

export const loadCategories = createAction(
    '[Categories View] Load categories'
);

export const loadedCategories = createAction(
    '[Categories View] Load success',
    props<{categories: Category[]}>()
);

export const deleteCategory = createAction(
    '[Category Delete] Deleting category',
    props<{ id: number }>()
)

export const deletedCategory = createAction(
    '[Category Delete] Delete success'
)

export const editCategory = createAction(
    '[Category Edit] Editing category',
    props<{ id: number, category: Category }>()
)

export const editedCategory = createAction(
    '[Category Edit] Edit success'
)

export const createCategory = createAction(
    '[Category Create] Creating category',
    props<{ category: Category }>()
)

export const createdCategory = createAction(
    '[Category Create] Create success'
)

export const getCategoryById = createAction(
    '[Category Form] Get Category by id',
    props<{ id: number }>()
)

export const getCategoryByIdSuccess = createAction(
    '[Category Form] Get Category by id success',
    props<{ category: Category }>()
)