import { NgModule } from '@angular/core';
import { AppRoutingModule } from './todo-details.routing.module';
import { TodoDetailsComponent } from './todo-details.component';

@NgModule({
  declarations: [
    TodoDetailsComponent
  ],
  imports: [
    AppRoutingModule
  ],
  exports: [],
  providers: [],
  bootstrap: [TodoDetailsComponent],
})
export class TodoDetailsModule {}
