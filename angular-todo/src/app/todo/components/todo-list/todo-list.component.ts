import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { TodoModel, Todo } from '../../models/Todo';

import { TodoListService } from '../../services/todo-list/todo-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { TodoListSetting } from '../../models/todo-list-settings';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  @Input() public todos: TodoModel[] = [];
  @Input() public settings: TodoListSetting;

  @Output() public todoSelect = new EventEmitter<number>();

  public todoSorted: boolean = false;
  public todoSearch: string = '';
  public filter: string = 'all';
  public anyRemainingModel: boolean = true;
  public selectedTodo: Todo = null;

  private params: Params;

  constructor(public todoListService: TodoListService) {}

  public remaining(): number {
    return this.todos && this.todos.filter((todo) => !todo.status).length;
  }

  public anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  public atLeastOneCompleted(): boolean {
    return this.todos && this.todos.filter((todo) => todo.status).length > 0;
  }

  public clearCompleted(): void {
    this.todos = this.todos.filter((todo) => !todo.status);
  }

  public checkAllTodos(event: Event): void {
    this.todos.forEach(
      (todo) => (todo.status = (event.target as HTMLInputElement).checked)
    );
    this.anyRemainingModel = this.anyRemaining();
  }

  public todosFiltered(): TodoModel[] {
    if (!this.todos) {
      return;
    }

    if (this.filter === 'all') {
      return [...this.todos];
    } else if (this.filter === 'active') {
      return this.todos.filter((todo) => !todo.status);
    } else if (this.filter === 'completed') {
      return this.todos.filter((todo) => todo.status);
    }
    return this.todos;
  }

  public searchTodo(value: string): void {
    this.todoSearch = value;
  }

  public selectTodo(todo: TodoModel) {
    if (this.canSelect(todo)) {
      console.log(todo.id);
      this.todoSelect.emit(todo.id);
      this.selectedTodo = todo;
    }
  }

  public canSelect(todo: TodoModel): boolean {
    return (
      Boolean(todo) && (!this.selectedTodo || this.selectedTodo.id !== todo.id)
    );
  }

  public sort(): void {
    this.todos = this.todos.sort((todo, otherTodo) => {
      const todoTitle: string = String(todo.title).toLowerCase();
      const otherTodoTitle: string = String(otherTodo.title).toLowerCase();
      const result: boolean = this.todoSorted
        ? todoTitle < otherTodoTitle
        : todoTitle > otherTodoTitle;
      return result ? 1 : -1;
    });
    this.todoSorted = !this.todoSorted;
  }

  public isTodoSelected(todo: TodoModel) {
    return Boolean(this.selectedTodo) && this.selectedTodo.equals(todo);
  }
}
