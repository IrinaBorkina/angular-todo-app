import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TodoModel } from '../../models/Todo';

import { TodoListService } from '../../services/todo-list/todo-list.service';


@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent {
  @Input() public todo: TodoModel;
  @Input() public index: number = null;
  @Output() public deletedItem: EventEmitter<TodoModel> = new EventEmitter();

  @Input() public isTodoSelected: boolean = false;

  @Output() public onTodoSelect: EventEmitter<TodoModel> = new EventEmitter<TodoModel>();

  public isEditMode: boolean = false;

  constructor(public todoListService: TodoListService) {}

  public editTodo(): void {
    this.isEditMode = !this.isEditMode;
  }

  public selectTodo(): void {
    this.onTodoSelect.emit(this.todo);
  }
}
