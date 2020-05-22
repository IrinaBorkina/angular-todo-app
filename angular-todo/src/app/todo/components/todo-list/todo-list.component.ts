import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TodoModel } from '../../models/Todo';

import { TodoListService } from '../../services/todo-list/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TodoListComponent {
  @Input() public todos: TodoModel[] = [];

  public todoSearch: string = '';

  constructor(public todoListService: TodoListService) {}

  public searchTodo() {
    this.todoListService.searchTodo(this.todoSearch);
  }

}
