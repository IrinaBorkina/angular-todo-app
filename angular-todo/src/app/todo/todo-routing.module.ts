import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { AuthGuard } from '../guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'todos',
    component: TodoComponent,
    canActivate: [AuthGuard]
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
      },
    ],
  },
  {
    path: 'todo-list',
    redirectTo: '/todos',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
