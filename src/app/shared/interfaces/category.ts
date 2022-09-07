export interface Category {
    id?: number;
    name: string;
    description: string;
    image: string;
    parent_category_id?: number;
    created_at?: string;
    update_at?: string;
    deleted_at?: string
}
