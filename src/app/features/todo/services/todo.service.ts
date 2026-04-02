import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    // services
    private storage = inject(Storage);

    private _todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

    private STORAGE_KEY = 'todos';
    todos$ = this._todos$.asObservable();

    async init() {
        try {
            await this.storage.create();
            const todos = await this.storage.get(this.STORAGE_KEY) || [];
            this._todos$.next(todos);
        } catch (error) {
            console.error('Error initializing storage:', error);
        }
    }

    async addTodo(value: Todo) {
        const currentTodos = this._todos$.value;
        const updatedTodos = [...currentTodos, value];
        await this.updateTodoList(updatedTodos);
    }

    async updateTodo(updatedTodo: Todo) {
        const currentTodos = this._todos$.value;
        const updatedTodos = currentTodos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
        await this.updateTodoList(updatedTodos);
    }

    async toggleTodoCompletion(id: string) {
        const currentTodos = this._todos$.value;
        const updatedTodos = currentTodos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        await this.updateTodoList(updatedTodos);
    }

    async removeTodo(id: string) {
        const currentTodos = this._todos$.value;
        const updatedTodos = currentTodos.filter(todo => todo.id !== id);
        await this.updateTodoList(updatedTodos);
    }

    async clearCategory(categoryId: string) {
        const currentTodos = this._todos$.value;
        const updatedTodos = currentTodos.map(todo =>
            todo.categoryId === categoryId ? { ...todo, categoryId: null } : todo
        );
        await this.updateTodoList(updatedTodos);
    }

    private async updateTodoList(todos: Todo[]) {
        await this.storage.set(this.STORAGE_KEY, todos);
        this._todos$.next(todos);
    }

}