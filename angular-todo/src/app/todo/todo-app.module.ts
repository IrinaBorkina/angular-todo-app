import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TodoComponent } from './components/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoListItemComponent } from './components/todo-list-item/todo-list-item.component';

import { ListFilterPipe } from './components/todo-list/todo-list.pipe';
import { TodoSearchComponent } from './components/todo-search/todo-search.component';

import { TodoListService } from './services/todo-list/todo-list.service';
import { TodoDataService } from './services/todo-data/todo-data.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { AboutMeComponent } from '../about-me/about-me.component';

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoHeaderComponent,
    TodoListItemComponent,
    ListFilterPipe,
    TodoSearchComponent,
    TodoDetailsComponent,
    AboutMeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    TodoRoutingModule,
  ],
  providers: [TodoListService, TodoDataService],
  exports: [TodoComponent],
})
export class AppTodoModule {}
