import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonFab, IonFabButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, heart, pricetagsOutline } from 'ionicons/icons';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { TodoCategoriesFormComponent } from '../../components/todo-categories-form/todo-categories-form.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonFab, IonFabButton, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPage {

  private modalCtrl = inject(ModalController);

  constructor() {
    addIcons({ add, heart, pricetagsOutline });
  }

  async openAddTodo() {
    const modal = await this.modalCtrl.create({
      component: TodoFormComponent
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

    // if (data) {
    //   this.todoService.addTodo(data);
    // }
  }

  async openCategories() {
    const modal = await this.modalCtrl.create({
      component: TodoCategoriesFormComponent
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

  }

}
