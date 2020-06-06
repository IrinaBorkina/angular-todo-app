import { createAction, props } from '@ngrx/store';
import { Todo } from './models/Todo';

export const create = createAction('[TODO] Add', props<{ title: string }>());
export const remove = createAction('[TODO] Delete', props<{ id: number }>());
export const load = createAction('[TODO] Load');
export const loadSuccess = createAction(
  '[TODO] Load (Success)',
  props<{ todos: Todo[] }>()
);
export const loadError = createAction('[TODO] Load (Error)');
