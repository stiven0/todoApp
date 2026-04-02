import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonFab, IonFabButton, IonIcon, ModalController,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, heart, pricetagsOutline } from 'ionicons/icons';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { TodoCategoriesFormComponent } from '../../components/todo-categories-form/todo-categories-form.component';
import { TodoService } from '../../services/todo.service';
import { CategoryService } from '../../services/category.service';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { AsyncPipe } from '@angular/common';
import { Category } from '../../models/todo-category';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonFab, 
    IonFabButton, 
    IonIcon, 
    IonSpinner,
    TodoItemComponent,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPage {

  private todoService = inject(TodoService);
  private categoryService = inject(CategoryService);
  private modalCtrl = inject(ModalController);

  todos$ = this.todoService.todos$;
  categories$ = this.categoryService.categories$;
  categoriesAllowed = signal<Category[]>([]);

  constructor() {
    addIcons({ add, heart, pricetagsOutline });
    this.todos$.subscribe(todos => console.log('todos', todos));
    this.categories$.subscribe(categories => {
      this.categoriesAllowed.set(categories);
      console.log('categories', this.categoriesAllowed());
    });
  }

  categoryById(id: string | null): Category | null {
    if (!id || this.categoriesAllowed().length === 0) {
      return null;
    }
    return this.categoriesAllowed().find(category => category.id === id) ?? null;
  }

  async openAddTodo() {
    const modal = await this.modalCtrl.create({
      component: TodoFormComponent
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      this.todoService.addTodo(data);
    }
  }

  async openEditTodo(todo: Todo) {
    const modal = await this.modalCtrl.create({
      component: TodoFormComponent,
      componentProps: {
        todoToEdit: todo
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      this.todoService.updateTodo(data);
    }
  }

  async openCategories() {
    const modal = await this.modalCtrl.create({
      component: TodoCategoriesFormComponent
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      this.categoryService.addCategory(data);
    }

  }

  toggleTodoCompletion(id: string) {
    this.todoService.toggleTodoCompletion(id);
  }

  removeTodo(id: string) {
    this.todoService.removeTodo(id);
  }

}
