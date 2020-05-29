export interface TodoModel {
  id: number;
  title: string;
  status: boolean;
  date: Date;
  equals(todo: TodoModel): boolean;
}

export class Todo implements TodoModel {
  constructor(public id: number, public title: string, public status: boolean = false, public date: Date) {
  }

  public static fromJSON(json: any): TodoModel {
    return Boolean(json)
      ? new Todo(json.id, json.title, json.status, json.date)
      : null;
  }

  public static toJSON(todo: TodoModel): any {
    return Boolean(todo)
      ? {
        id: todo.id,
        title: todo.title,
        status: todo.status,
        date: todo.date
      }
      : {};
  }

  public equals(todo: TodoModel): boolean {
    return Boolean(todo)
      && this.id === todo.id
      && this.title === todo.title
      && this.status === todo.status
      && this.date === todo.date;
  }
}
