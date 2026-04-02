import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonFooter, IonList, IonItem, IonLabel, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, closeOutline, createOutline, trashOutline } from 'ionicons/icons';
import { CategoryService } from '../../services/category.service';
import { TodoCategoriesFormComponent } from '../todo-categories-form/todo-categories-form.component';
import { Category } from '../../models/todo-category';

@Component({
  selector: 'app-todo-categories-manager',
  templateUrl: './todo-categories-manager.component.html',
  styleUrls: ['./todo-categories-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
    IonContent, IonFooter, IonList, IonItem, IonLabel
  ]
})
export class TodoCategoriesManagerComponent {

  private categoryService = inject(CategoryService);
  private modalCtrl = inject(ModalController);

  readonly categories = toSignal(this.categoryService.categories$, { initialValue: [] as Category[] });

  constructor() {
    addIcons({ add, closeOutline, createOutline, trashOutline });
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async openAddCategory() {
    const modal = await this.modalCtrl.create({
      component: TodoCategoriesFormComponent
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      await this.categoryService.addCategory(data);
    }
  }

  async openEditCategory(category: Category) {
    const modal = await this.modalCtrl.create({
      component: TodoCategoriesFormComponent,
      componentProps: { categoryToEdit: category }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      await this.categoryService.updateCategory(data);
    }
  }

  async removeCategory(id: string) {
    await this.categoryService.removeCategory(id);
  }

}
