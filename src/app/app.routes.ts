import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todo',
    loadComponent: () => import('./features/todo/pages/todo/todo.page').then( m => m.TodoPage)
  },
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full',
  },
];
