import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodoComponent,
  },
  {
    path: 'todos/:id',
    component: TodoComponent,
  },
  {
    path: 'todos/',
    component: TodoComponent,
    children: [
      {
        path: 'details-todo',
        component: TodoDetailsComponent,
        // loadChildren: () => import('./components/todo-details/todo-details.module').then(m => m.TodoDetailsModule)
      },
    ],
  },
  {
    path: 'todo-list',
    redirectTo: '/todos',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
