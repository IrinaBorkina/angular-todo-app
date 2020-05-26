import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppTodoModule } from './todo/todo-app.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TodoRoutingModule } from './todo/todo-routing.module';
import { CanProceedToAboutGuard } from './guards/can-proceed-to-about.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
  BrowserModule,
    FormsModule,
    AppTodoModule,
    TodoRoutingModule,
    AppRoutingModule,
  ],
  exports: [AppComponent],
  providers: [
    CanProceedToAboutGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
