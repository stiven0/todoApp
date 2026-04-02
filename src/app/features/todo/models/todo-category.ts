export interface Category {
    id: string;
    name: string;
    color: string;
}

export type TodoCategoryFilter = 'all' | 'uncategorized' | string;