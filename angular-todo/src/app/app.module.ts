import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppTodoModule } from './todo/todo-app.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TodoRoutingModule } from './todo/todo-routing.module';
import { CanProceedToAboutGuard } from './guards/can-proceed-to-about.guard';
import { LoginComponent } from './login/login.component';

import {fakeBackendProvider} from './_helpers/fake-backend';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppTodoModule,
    TodoRoutingModule,
    AppRoutingModule,
  ],
  exports: [AppComponent],
  providers: [
    CanProceedToAboutGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
