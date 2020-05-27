import { NgModule } from '@angular/core';
import { AppRoutingModule } from './todo-details.routing.module';
import { TodoDetailsComponent } from './todo-details.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TodoDetailsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [],
  bootstrap: [TodoDetailsComponent],
})
export class TodoDetailsModule {}
