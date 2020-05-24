import { Injectable } from '@angular/core';
import { TodoModel, Todo } from '../../models/Todo';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoListSetting } from '../../models/todo-list-settings';

@Injectable()
export class TodoDataService {
  private static userListLSKey: string = 'app--todo-list';
  private baseUrl: string = 'assets';

  constructor(
    private httpClient: HttpClient
  ) { }

  public loadTodoList(): Observable<TodoModel[]> {
    const LocalStorageData: any = localStorage.getItem(TodoDataService.userListLSKey);
    if (LocalStorageData) {
      return of(
        (JSON.parse(LocalStorageData) || [])
          .filter(Boolean)
          .map(Todo.fromJSON)
        );
    } else {
      return this.httpClient.get<TodoModel[]>(`${this.baseUrl}/todo-list.json`)
      .pipe(
        map((json: any) => {
          return (json || [])
            .filter(Boolean)
            .map(Todo.fromJSON);
        })
      );
    }
  }

  public loadSettings(): Observable<TodoListSetting> {
    return this.httpClient.get<TodoListSetting>(`${this.baseUrl}/todo-list-settings.json`);
  }

  public save(todos: TodoModel[]): void {
    localStorage.setItem(
      TodoDataService.userListLSKey,
      JSON.stringify(
        todos.map(Todo.toJSON)
        )
    );
  }

  // public save(uls: UserListSnapshot): void {
  //   localStorage.setItem(
  //     UserListDataService.userListLSKey,
  //     JSON.stringify(
  //       UserListSnapshot.toJSON(uls)
  //     )
  //   );
  //   this.loadUserList();
  // }
}
