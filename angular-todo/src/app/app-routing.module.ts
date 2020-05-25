import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoInfoComponent } from './todo-info/todo-info.component';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/components/todo/todo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TodoListComponent } from './todo/components/todo-list/todo-list.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'todos',
    component: TodoComponent
  },
  {
    path: 'todo',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'todo-info',
    component: TodoInfoComponent,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
