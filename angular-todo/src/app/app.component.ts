import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/auth/auth.service';
import { User } from './user';
import { UserService } from './services/user/user.service';
import { first } from 'rxjs/operators';
import { TodoListService } from './todo/services/todo-list/todo-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-todo';
  user: User;
  loading = false;
  userFromApi: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    public todoListService: TodoListService
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
    this.user = this.authenticationService.userValue;
  }

  ngOnInit() {
    this.todoListService.loadTodo();

    this.loading = true;
    this.userService
      .getById(this.user.id)
      .pipe(first())
      .subscribe((user) => {
        this.loading = false;
        this.userFromApi = user;
      });
  }

  logout() {
    this.authenticationService.logout();
  }
}
