import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TodoModel } from '../../models/Todo';

import { TodoListService } from '../../services/todo-list/todo-list.service';


@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent {
  // @Input() public todos: TodoModel[] = [];
  @Input() public todo: TodoModel;
  @Input() public index: number = null;

  @Output() public deletedItem: EventEmitter<TodoModel> = new EventEmitter();

  // public isEditMode: boolean = false;

  constructor(public todoListService: TodoListService) {}

  // public deleteTodo(todo): void {
  //   console.log('del3');
  //   this.deletedItem.emit(todo);
  // }

  // public deleteTodo(todo): void {
  //   console.log('del3');
  //   this.todoListService.deleteTodo(todo);
  // }

  // public editTodo(): void {
  //   this.isEditMode = !this.isEditMode;
  // }

  // public editTodo(): void {
  //   console.log('edit2');
  //   this.todoListService.editTodo();
  // }
}
