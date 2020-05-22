import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent {
  @Output() public todoCreated = new EventEmitter<string>();

  public title: string = '';
  public isTodoAdded: boolean = false;

  public changeTitle(): void {
    this.isTodoAdded = false;
  }

  public addTodo(): void {
    this.todoCreated.emit(this.title);
    this.title = '';
    this.isTodoAdded = true;
  }

  public canBeAdded(): boolean {
    return !!this.title;
  }
}
