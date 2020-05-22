import { Injectable } from '@angular/core';
import { TodoModel, Todo } from '../../models/Todo';
import { TodoDataService } from '../todo-data/todo-data.service';


@Injectable()
export class TodoListService {
  public todos: TodoModel[] = [];
  public id: number;
  public todoSorted: boolean = false;
  public todoSearch: string = '';
  public filter: string = 'all';
  public anyRemainingModel: boolean = true;
  public isEditMode: boolean = false;

  constructor( private todoDataService: TodoDataService ) {
    this.todos = this.todoDataService.getTodoList();
  }

  public todoCreated(title: string): void {
    console.log('add');
    this.todos = [...this.todos, new Todo(Math.floor(Math.random() * 100), title, false)];
  }

  public deleteTodo(id: number): void {
    console.log('del');
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  public editTodo(): void {
    console.log('edit1');
    this.isEditMode = !this.isEditMode;
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
    console.log('sort');
  }

  public searchTodo(value: string): void {
    this.todoSearch = value;
  }

  public remaining(): number {
    return this.todos.filter(todo => !todo.status).length;
  }

  public anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  public atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.status).length > 0;
  }

  public clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.status);
  }

  public checkAllTodos(event: Event): void {
    this.todos.forEach(todo => todo.status = (event.target as HTMLInputElement).checked);
    this.anyRemainingModel = this.anyRemaining();
  }

  public todosFiltered(): TodoModel[] {
    if (this.filter === 'all') {
      return [...this.todos];
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.status);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.status);
    }
    return this.todos;
  }

}
