import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppTodoModule } from './todo/todo-app.module';
import { HomeComponent } from './home/home.component';
import { TodoInfoComponent } from './todo-info/todo-info.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TodoRoutingModule } from './todo/todo-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoInfoComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppTodoModule,
    TodoRoutingModule,
    AppRoutingModule
  ],
  exports: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
