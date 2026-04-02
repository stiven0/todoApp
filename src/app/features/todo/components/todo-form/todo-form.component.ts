import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmark, closeOutline, cog } from 'ionicons/icons';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/todo-category';
import { Todo } from '../../models/todo.model';
import { FormValidationService } from '../../services/form-validation.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule
  ]
})
export class TodoFormComponent {

  private modalCtrl = inject(ModalController);
  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);
  private formValidationService = inject(FormValidationService);

  readonly categories$ = this.categoryService.categories$;


  readonly todoForm = this.fb.group({
    title: ['', [Validators.required, this.formValidationService.validateThatThePropertyIsNotJustBlanks]],
    categoryId: [null as string | null]
  });

  constructor() {
    addIcons({ closeOutline, checkmark });
  }

  async closeModal() {
    await this.modalCtrl.dismiss(null, 'cancel');
  }

  async createTodo() {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    const { title, categoryId } = this.todoForm.getRawValue();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: (title ?? '').trim(),
      completed: false,
      categoryId: categoryId ?? null,
      createdAt: Date.now()
    };
    await this.modalCtrl.dismiss(newTodo, 'created');
  }

  trackByCategoryId(_index: number, category: Category) {
    return category.id;
  }

}
