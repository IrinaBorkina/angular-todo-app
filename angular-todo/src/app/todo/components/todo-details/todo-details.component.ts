import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../../models/Todo';
import { TodoListService } from '../../services/todo-list/todo-list.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {

  // public get user(): TodoModel {
  //   return this.todoListService.selectedTodo;
  // }

  constructor(
    private todoListService: TodoListService
  ) { }

  ngOnInit(): void {
  }

}
