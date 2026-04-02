import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/todo-category.types';
import { TodoService } from './todo.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    // services
    private storage = inject(Storage);
    private todoService = inject(TodoService);

    private _categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
    
    private STORAGE_KEY = 'categories';
    categories$ = this._categories$.asObservable();

    async init() {
        try {
            await this.storage.create();
            const categories = await this.storage.get(this.STORAGE_KEY) || [];
            this._categories$.next(categories);
        } catch (error) {
            console.error('Error initializing storage:', error);
        }
    }

    async addCategory(value: Category) {
        const currentCategories = this._categories$.value;
        const updatedCategories = [...currentCategories, value];
        await this.updateCategoryList(updatedCategories);
    }

    async updateCategory(updatedCategory: Category) {
        const currentCategories = this._categories$.value;
        const updatedCategories = currentCategories.map(category => category.id === updatedCategory.id ? updatedCategory : category);
        await this.updateCategoryList(updatedCategories);
    }

    async removeCategory(id: string) {
        await this.todoService.clearCategory(id);
        const currentCategories = this._categories$.value;
        const updatedCategories = currentCategories.filter(category => category.id !== id);
        await this.updateCategoryList(updatedCategories);
    }

    private async updateCategoryList(updatedCategories: Category[]) {
        this._categories$.next(updatedCategories);
        await this.storage.set(this.STORAGE_KEY, updatedCategories);
    }


}