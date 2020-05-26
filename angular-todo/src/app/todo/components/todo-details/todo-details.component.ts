import { Component, OnInit, Input } from '@angular/core';
import { TodoModel } from '../../models/Todo';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {
  @Input() public todo: TodoModel;

  constructor() { }

  ngOnInit(): void {
  }

}
