import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../models/todo-category';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmark, closeOutline } from 'ionicons/icons';

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
export class TodoCategoriesFormComponent  implements OnInit {

  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);

  readonly todoCategoryForm = this.fb.group({
    name: [''],
    color: ['#000000']
  });

  constructor() {
    addIcons({ closeOutline, checkmark });
  }

  ngOnInit() {}

  async closeModal() {
    await this.modalCtrl.dismiss(null, 'cancel');
  }

  async createCategory() {
    const { name, color } = this.todoCategoryForm.getRawValue();
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: (name ?? '').trim(),
      color: color ?? '#000000'
    };
    await this.modalCtrl.dismiss(newCategory, 'created');
  }

}
