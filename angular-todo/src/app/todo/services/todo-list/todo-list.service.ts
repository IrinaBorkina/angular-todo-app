import { Injectable, OnDestroy } from '@angular/core';
import { TodoModel, Todo } from '../../models/Todo';
import { TodoDataService } from '../todo-data/todo-data.service';
import { combineLatest, Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { TodoListSetting } from '../../models/todo-list-settings';


@Injectable()
export class TodoListService implements OnDestroy {
  public todos: TodoModel[] = [];
  public id: number;

  private destroySubject$: Subject<boolean> = new Subject<boolean>();
  public todos$: ReplaySubject<TodoModel[]> = new ReplaySubject<TodoModel[]>(1);
  public settings$: ReplaySubject<TodoListSetting> = new ReplaySubject<TodoListSetting>();

  constructor( private todoDataService: TodoDataService ) {

    combineLatest([
      this.todoDataService.loadTodoList()
        .pipe(
          take(1),
          takeUntil(this.destroySubject$)
        ),

      this.todoDataService.loadSettings()
      .pipe(
        take(1),
        takeUntil(this.destroySubject$)
      )])
    .subscribe(([todos, settings]: [TodoModel[], TodoListSetting]) => {
      this.todos = todos;
      this.todos$.next(todos);
      this.settings$.next(settings);
    });

  }

  ngOnDestroy() {
    this.destroySubject$.next(true);
    this.destroySubject$.complete();
  }

  public todoCreated(title: string): void {
    this.todos = [...this.todos, new Todo(Math.floor(Math.random() * 1000), title, false, new Date())];
    this.todos$.next(this.todos);
  }

  public deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todos$.next(this.todos);
  }

  public save(): void {
    this.todoDataService.save(this.todos);
  }
}
