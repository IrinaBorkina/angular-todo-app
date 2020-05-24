import { Injectable, OnDestroy } from '@angular/core';
import { TodoModel, Todo } from '../../models/Todo';
import { TodoDataService } from '../todo-data/todo-data.service';
import { TodoListSetting } from '../../models/todo-list-settings';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, take, delay } from 'rxjs/operators';


@Injectable()
export class TodoListService implements OnDestroy {
  public todos: TodoModel[] = [];
  public id: number;
  public todoSorted: boolean = false;
  public todoSearch: string = '';
  public filter: string = 'all';
  public anyRemainingModel: boolean = true;
  public isEditMode: boolean = false;
  public settings: TodoListSetting = null;
  // public isTodoListSaved: boolean = false;


  private destroySubject$: Subject<boolean> = new Subject<boolean>();

  constructor( private todoDataService: TodoDataService ) {

    combineLatest([
      this.todoDataService.loadTodoList()
        .pipe(
          delay(1000),
          take(1),
          takeUntil(this.destroySubject$)
        ),

      this.todoDataService.loadSettings()
      .pipe(
        delay(2000),
        take(1),
        takeUntil(this.destroySubject$)
      )])
    .subscribe(([data, settings]: [TodoModel[], TodoListSetting]) => {
      this.todos = data;
      this.settings = settings;
    });

  }

  ngOnDestroy() {
    this.destroySubject$.next(true);
    this.destroySubject$.complete();
  }

  public todoCreated(title: string): void {
    this.todos = [...this.todos, new Todo(Math.floor(Math.random() * 100), title, false)];
  }

  public deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  public editTodo(): void {
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

  // public changeTodoList(): void {
  //   this.isTodoListSaved = false;
  // }

  public save(): void {
    // this.todos = this.todos.map((todo: TodoModel) => {
    //   const currentUser: TodoModel = this.todos.find((otherUser: TodoModel) => otherUser.id === todo.id);
    //   return currentUser || todo;
    // });
    // this.isTodoListSaved = true;

    this.todoDataService.save(this.todos);
  }
}
