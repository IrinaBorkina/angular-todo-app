export interface TodoModel {
  id: number;
  title: string;
  status: boolean;
}

export class Todo implements TodoModel {
  constructor(public id: number, public title: string, public status: boolean = false) {
  }
}
