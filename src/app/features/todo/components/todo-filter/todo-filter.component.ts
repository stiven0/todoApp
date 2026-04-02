import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Category, TodoCategoryFilter } from '../../models/todo-category';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonicModule]
})
export class TodoFilterComponent {

  categories = input<Category[]>([]);
  searchTerm = input('');
  selectedCategoryId = input<TodoCategoryFilter>('all');

  searchChange = output<string>();
  categoryChange = output<TodoCategoryFilter>();

  onSearchInput(event: Event) {
    const value = (event as CustomEvent<{ value?: string }>).detail?.value ?? '';
    this.searchChange.emit(value);
  }

  selectCategory(categoryId: TodoCategoryFilter) {
    this.categoryChange.emit(categoryId);
  }

}
