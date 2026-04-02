import { Component, OnInit, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TodoService } from './features/todo/services/todo.service';
import { CategoryService } from './features/todo/services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  private todoService = inject(TodoService);
  private categoryService = inject(CategoryService);

  async ngOnInit() {
    await this.todoService.init();
    await this.categoryService.init();
  }

}
