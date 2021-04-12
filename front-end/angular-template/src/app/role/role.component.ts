import { RolesService } from './../services/roles.service';
import { Component, OnInit } from '@angular/core';
import { Role } from './role';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  roles: Array<Role> = [];
  errorMessage: string;

  form: any = {};

  constructor(private rolesService: RolesService) {}

  ngOnInit(): void {
    this.rolesService.getAll().subscribe(
      (data) => {
        console.log(data);
        // tslint:disable-next-line: no-string-literal
        this.roles = data['body'].map((role) => new Role(role.id, role.name));
      },
      (error) => {
        console.log(error);
        this.errorMessage = `${error.status}: ${error.message}`;
      }
    );
  }

  addNewRole(): void {
    if (this.form.roleName === '') {
      return;
    }

    this.rolesService.addRole(this.form.roleName).subscribe(
      (data) => {
        // tslint:disable-next-line: no-string-literal
        console.log(data['name']);
        this.form = {};
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.errorMessage = `${error.status}: ${error.message}`;
      }
    );
  }

  deleteRole(roleId: number): void {
    this.rolesService.deleteRole(roleId).subscribe(
      (data) => {
        // tslint:disable-next-line: no-string-literal
        console.log(data['body']);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.errorMessage = `${error.status}: ${error.message}`;
      }
    );
  }
}
