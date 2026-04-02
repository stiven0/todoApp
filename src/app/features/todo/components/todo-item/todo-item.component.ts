import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmarkCircle, createOutline, ellipseOutline, trashOutline } from 'ionicons/icons';
import { Category } from '../../models/todo-category';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class TodoItemComponent {

  todo = input.required<Todo>();
  category = input.required<Category | null>();
  toggle = output<string>();
  edit = output<Todo>();
  remove = output<string>();

  constructor() {
    addIcons({ checkmarkCircle, ellipseOutline, createOutline, trashOutline });    
  }

  categoryName() {
    return this.category()?.name ?? 'Sin categoria';
  }

  categoryColor() {
    return this.category()?.color ?? '#8b96a8';
  }

  onToggle() {
    this.toggle.emit(this.todo().id);
  }

  onEdit() {
    this.edit.emit(this.todo());
  }

  onDelete() {
    this.remove.emit(this.todo().id);
  }

}
