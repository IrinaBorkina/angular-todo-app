export interface TodoModel {
  id: number;
  title: string;
  status: boolean;
  equals(todo: TodoModel): boolean;
}

export class Todo implements TodoModel {
  constructor(public id: number, public title: string, public status: boolean = false) {
  }

  public static fromJSON(json: any): TodoModel {
    return Boolean(json)
      ? new Todo(json.id, json.title, json.status)
      : null;
  }

  public static toJSON(todo: TodoModel): any {
    return Boolean(todo)
      ? {
        id: todo.id,
        title: todo.title,
        status: todo.status
      }
      : {};
  }

  public equals(todo: TodoModel): boolean {
    return Boolean(todo)
      && this.id === todo.id
      && this.title === todo.title
      && this.status === todo.status;
  }
}
