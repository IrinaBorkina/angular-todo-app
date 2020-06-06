import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { load, loadSuccess, loadError } from './todo.actions';
import { catchError, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodoDataService } from './services/todo-data/todo-data.service';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoDataService: TodoDataService
  ) {}

  @Effect()
  loadTodos$ = this.actions$.pipe(
    ofType(load),
    switchMap((action) =>
      this.todoDataService.loadTodoList().pipe(
        map((todos) => loadSuccess({ todos })),
        catchError(() => of(loadError()))
      )
    )
  );
}
