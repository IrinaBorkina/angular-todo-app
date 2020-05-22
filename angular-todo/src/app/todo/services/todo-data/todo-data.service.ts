import { Injectable } from '@angular/core';
import { TodoModel } from '../../models/Todo';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TodoDataService {

  private baseUrl: string = 'assets';

  constructor(
    private httpClient: HttpClient
  ) { }

  public loadTodoList(): Observable<TodoModel[]> {
    return this.httpClient.get<TodoModel[]>(`${this.baseUrl}/todo-list.json`);
  }
}
