import { ActionReducerMap } from '@ngrx/store';
import { Todo } from './todo/models/Todo';
import { todoReducer } from './todo/todo.reducer';

export interface AppState {
  todos: Todo[];
}

export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
};
