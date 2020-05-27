import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../../models/Todo';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoListService } from '../../services/todo-list/todo-list.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit {
  public todo: TodoModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public todoListService: TodoListService
  ) {}

  ngOnInit(): void {
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
        this.todo = currentTodo;
        currentTodo
          ? (this.todo = currentTodo)
          : this.router.navigate(['/todos']);
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }
}
