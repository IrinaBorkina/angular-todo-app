import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TodoModel } from '../../models/Todo';

import { TodoListService } from '../../services/todo-list/todo-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TodoListComponent implements OnInit {
  @Input() public todos: TodoModel[] = [];

  public todoSearch: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public todoListService: TodoListService
  ) {}

  ngOnInit() {
    combineLatest([
      this.activatedRoute.params,
      this.todoListService.savedUserList$,
    ]).subscribe(([params, todos]: [Params, TodoModel[]]) => {
      const currentTodoId: number = params ? parseInt(params.id) : null;
      if (currentTodoId && todos && todos.length > 0) {
        const currentTodo: TodoModel = todos.find((todo: TodoModel) => todo.id === currentTodoId);
        if (currentTodo) {
          this.todoListService.selectTodo(currentTodo);
        } else {
          this.selectTodo(todos[0].id);
        }
      }
    });
  }

  public selectTodo(todoId: number): void {
    this.router.navigate(['/todos', todoId]);
  }

  public searchTodo() {
    this.todoListService.searchTodo(this.todoSearch);
  }
}
