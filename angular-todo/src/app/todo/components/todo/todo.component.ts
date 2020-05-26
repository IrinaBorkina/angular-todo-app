import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TodoListService } from '../../services/todo-list/todo-list.service';
import { combineLatest, Subscription } from 'rxjs';
import { TodoModel } from '../../models/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public todoListService: TodoListService
  ) {}

  ngOnInit() {
    combineLatest([
      this.activatedRoute.params,
      this.todoListService.todos$,
    ]).subscribe(([params, todos]) => {
      const currentTodoId: number = params
        ? parseInt(params.id, 10)
        : undefined;

      if (currentTodoId && todos && todos.length) {
        const currentTodo: TodoModel = todos.find(
          (todo: TodoModel) => todo.id === currentTodoId
        );

        currentTodo
          ? this.router.navigate(['/todos', currentTodoId])
          : this.router.navigate(['/todos', todos[0].id]);
      }
    });
  }

  handleTodoSelect($event: string) {
    this.router.navigate(['/todos', $event, 'details-todo']);
  }
}
