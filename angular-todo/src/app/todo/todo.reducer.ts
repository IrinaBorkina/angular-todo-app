import { createReducer, on } from '@ngrx/store';
import { create, remove, loadSuccess } from './todo.actions';
import { Todo } from './models/Todo';

export const initialState: Todo[] = [];

const _todoReducer = createReducer(
  initialState,
  on(create, (state, { title }) => [
    ...state,
    new Todo(Math.floor(Math.random() * 1000), title, false, new Date()),
  ]),
  on(remove, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(loadSuccess, (_, { todos }) => [...todos])
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
