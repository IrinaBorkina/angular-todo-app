import { Injectable, Input } from '@angular/core';
import { TodoModel, Todo } from '../../models/Todo';

@Injectable()
export class TodoDataService {

  private static defaultTodoList: TodoModel[] = [
    new Todo(1, 'Learn Angular', false),
    new Todo(2, 'Training', false),
    new Todo(3, 'Eat an apple', false),
    new Todo(4, 'Buy a car', false),
    new Todo(5, 'Call Mom', false),
  ];

  constructor() { }

  getTodoList(): TodoModel[] {
    console.log('create');
    return TodoDataService.defaultTodoList;
  }
}
