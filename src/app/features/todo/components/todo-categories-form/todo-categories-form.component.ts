import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/todo-category';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmark, closeOutline } from 'ionicons/icons';
import { FormValidationService } from '../../services/form-validation.service';

@Component({
  selector: 'app-todo-categories-form',
  templateUrl: './todo-categories-form.component.html',
  styleUrls: ['./todo-categories-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule
  ]
})
export class TodoCategoriesFormComponent implements OnInit {

  @Input() categoryToEdit?: Category;

  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  private formValidationService = inject(FormValidationService);

  readonly todoCategoryForm = this.fb.group({
    name: ['', [Validators.required, this.formValidationService.validateThatThePropertyIsNotJustBlanks]],
    color: ['#000000', [Validators.required, this.formValidationService.validateThatThePropertyIsNotJustBlanks]]
  });

  get isEditMode(): boolean {
    return !!this.categoryToEdit;
  }

  constructor() {
    addIcons({ closeOutline, checkmark });
  }

  ngOnInit() {
    if (this.categoryToEdit) {
      this.todoCategoryForm.patchValue({
        name: this.categoryToEdit.name,
        color: this.categoryToEdit.color
      });
    }
  }

  async closeModal() {
    await this.modalCtrl.dismiss(null, 'cancel');
  }

  async saveCategory() {
    const { name, color } = this.todoCategoryForm.getRawValue();
    const category: Category = {
      id: this.categoryToEdit?.id ?? crypto.randomUUID(),
      name: (name ?? '').trim(),
      color: color ?? '#000000'
    };
    await this.modalCtrl.dismiss(category, 'saved');
  }

}
