import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoListService } from '../../services/todo-list/todo-list.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  constructor(
    private router: Router,
    public todoListService: TodoListService
  ) {}

  handleTodoSelect($event: string) {
    this.router.navigate(['/todos', $event]);
  }
}
