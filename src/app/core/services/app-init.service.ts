import { inject, Injectable } from '@angular/core';
import { CategoryService } from '../../features/todo/services/category.service';
import { TodoService } from '../../features/todo/services/todo.service';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    private todoService = inject(TodoService);
    private categoryService = inject(CategoryService);

    async init(): Promise<void> {
        await Promise.all([
            this.todoService.init(),
            this.categoryService.init()
        ]);
    }
}
