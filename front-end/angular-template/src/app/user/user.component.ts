import { Role } from './../role/role';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  content: string;
  errorMessage: string;

  users: Array<User> = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserArea().subscribe(
      (data) => {
        // tslint:disable-next-line: no-string-literal
        this.content = data['body'];
      },
      (error) => {
        console.log(error);
        this.errorMessage = `${error.status}: ${error.message}`;
      }
    );

    this.userService.getAllUsers().subscribe(
      (data) => {
        console.log(data);
        // tslint:disable-next-line: no-string-literal
        this.users = data['body'].map(
          (user) =>
            new User(
              user.id,
              user.name,
              user.username,
              user.email,
              user.roles.map((role) => new Role(role.id, role.name))
            )
        );
      },
      (error) => {
        console.log(error);
        this.errorMessage = `${error.status}: ${error.message}`;
      }
    );
  }

}
