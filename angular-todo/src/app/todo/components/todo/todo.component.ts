import { Component, Input } from '@angular/core';
import { TodoModel } from '../../models/Todo';

import { TodoListService } from '../../services/todo-list/todo-list.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() public todos: TodoModel[] = [];

  constructor(public todoListService: TodoListService) {}

}
