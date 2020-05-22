import { Pipe, PipeTransform } from '@angular/core';
import { TodoModel } from '../../models/Todo';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  transform(todos: TodoModel[], filterText: string): any {
    return todos ? todos.filter(item => item.title.search(new RegExp(filterText, 'i')) > -1) : [];
  }

}
