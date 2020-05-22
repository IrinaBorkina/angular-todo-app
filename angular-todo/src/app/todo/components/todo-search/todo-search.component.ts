import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.scss']
})
export class TodoSearchComponent{

  @Input() public todoSearch: string = '';

  @Output() searchModel: EventEmitter<string> = new EventEmitter();

  public search(): void {
    this.searchModel.emit(this.todoSearch);
  }
}
