import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonFab, IonFabButton, IonIcon, ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, heart, pricetagsOutline } from 'ionicons/icons';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { TodoCategoriesManagerComponent } from '../../components/todo-categories-manager/todo-categories-manager.component';
import { TodoService } from '../../services/todo.service';
import { CategoryService } from '../../services/category.service';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { Category, TodoCategoryFilter } from '../../models/todo-category';
import { Todo } from '../../models/todo.model';
import { TodoFilterComponent } from '../../components/todo-filter/todo-filter.component';

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
    TodoFilterComponent,
    TodoItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPage {

  private todoService = inject(TodoService);
  private categoryService = inject(CategoryService);
  private modalCtrl = inject(ModalController);

  readonly todos = toSignal(this.todoService.todos$, { initialValue: [] as Todo[] });
  readonly categories = toSignal(this.categoryService.categories$, { initialValue: [] as Category[] });
  readonly searchTerm = signal('');
  readonly selectedCategoryId = signal<TodoCategoryFilter>('all');
  readonly categoryMap = computed(() => new Map(this.categories().map(category => [category.id, category])));
  readonly filteredTodos = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();
    const selectedCategory = this.selectedCategoryId();

    return this.todos().filter(todo => {
      const matchesTitle = !query || todo.title.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === 'all'
        ? true
        : selectedCategory === 'uncategorized'
          ? todo.categoryId === null
          : todo.categoryId === selectedCategory;

      return matchesTitle && matchesCategory;
    });
  });

  constructor() {
    addIcons({ add, heart, pricetagsOutline });
  }

  categoryById(id: string | null): Category | null {
    if (!id) {
      return null;
    }
    return this.categoryMap().get(id) ?? null;
  }

  onSearchChange(value: string) {
    this.searchTerm.set(value);
  }

  onCategoryChange(value: TodoCategoryFilter) {
    this.selectedCategoryId.set(value);
  }

  async openAddTodo() {
    const modal = await this.modalCtrl.create({
      component: TodoFormComponent
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      await this.todoService.addTodo(data);
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
      await this.todoService.updateTodo(data);
    }
  }

  async openCategories() {
    const modal = await this.modalCtrl.create({
      component: TodoCategoriesManagerComponent
    });
    await modal.present();
  }

  async toggleTodoCompletion(id: string) {
    await this.todoService.toggleTodoCompletion(id);
  }

  async removeTodo(id: string) {
    await this.todoService.removeTodo(id);
  }

}
