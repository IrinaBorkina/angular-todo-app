import { Injectable, OnDestroy } from '@angular/core';
import { TodoModel } from '../../models/Todo';
import { TodoDataService } from '../todo-data/todo-data.service';
import { combineLatest, Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { TodoListSetting } from '../../models/todo-list-settings';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import * as actions from '../../todo.actions';

@Injectable()
export class TodoListService implements OnDestroy {
  public todos: TodoModel[] = [];
  public id: number;

  private destroySubject$: Subject<boolean> = new Subject<boolean>();
  public todos$ = this.store.select((state) => state.todos);
  public settings$: ReplaySubject<TodoListSetting> = new ReplaySubject<
    TodoListSetting
  >();

  constructor(
    private todoDataService: TodoDataService,
    private store: Store<AppState>
  ) {
    combineLatest([
      this.todoDataService
        .loadSettings()
        .pipe(take(1), takeUntil(this.destroySubject$)),
    ]).subscribe(([settings]: [TodoListSetting]) => {
      this.settings$.next(settings);
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next(true);
    this.destroySubject$.complete();
  }

  public loadTodo() {
    this.store.dispatch(actions.load());
  }

  public todoCreated(title: string) {
    this.store.dispatch(actions.create({ title }));
  }

  public deleteTodo(id: number) {
    this.store.dispatch(actions.remove({ id }));
  }

  public save(): void {
    this.todoDataService.save(this.todos);
  }
}
