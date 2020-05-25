import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TodoModel, Todo } from '../../models/Todo';

import { TodoListService } from '../../services/todo-list/todo-list.service';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TodoListComponent implements OnInit {
  @Input() public todos: TodoModel[] = [];

  public todoSearch: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    public todoListService: TodoListService
    ) {}

    ngOnInit() {
      combineLatest([
        this.activatedRoute.params,
        this.todoListService.savedUserList$
      ])
      .subscribe(([params, todos]: [Params, TodoModel[]]) => {
        const currentTodoId: number = params ? parseInt(params.id, 10) : null;
        if (currentTodoId && todos && todos.length > 0) {
          const currentTodo: TodoModel = todos.find((todo: TodoModel) => todo.id === currentTodoId);
          this.todoListService.selectTodo(currentTodo || todos[0]);
        }
      });
    }

  public searchTodo() {
    this.todoListService.searchTodo(this.todoSearch);
  }

}
