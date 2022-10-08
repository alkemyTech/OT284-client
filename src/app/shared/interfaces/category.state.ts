import { Category } from './category';

export interface CategoryState {
    loading: boolean;
    categories: Category[];
    categoriesResults: Category[];
    error: any;
}