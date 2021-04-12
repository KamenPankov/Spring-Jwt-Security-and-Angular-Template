import { TokenStorageService } from './../auth/token-storage.service';
import { RolesService } from './../services/roles.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from './../role/role';
import { User } from './../user/user';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  newUser: User;
  id: string;
  errorMessage: string;
  successMessage: string;
  roles: Array<Role> = [];

  constructor(
    private userService: UserService,
    private rolesService: RolesService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(map((param) => param.get('id')))
      .subscribe((response) => (this.id = response));

    this.getUserDetails(Number(this.id)).subscribe(
      (response) => {
        this.newUser = response;
        this.checkUserRoles();
      },
      (error) => {
        console.log(error);
        this.errorMessage = `${error.status} ${error.error.error}: ${error.message}`;
      }
    );

    if (this.isAdmin()) {
      this.rolesService.getAll().subscribe(
        (data) => {
          this.roles = data['body'].map((role) => new Role(role.id, role.name));
          this.checkUserRoles();
        },
        (error) => {
          console.log(error);
          this.errorMessage = `${error.status}: ${error.message}`;
        }
      );
    }
  }

  getUserDetails(id: number): Observable<User> {
    return this.userService.getUserDetails(id).pipe(
      map((response) => {
        const body = response['body'];

        return new User(
          body.id,
          body.name,
          body.username,
          body.email,
          body.roles.map((role) => new Role(role.id, role.name))
        );
      })
    );
  }

  checkUserRoles(): void {
    if (this.newUser && this.roles.length) {
      this.roles.forEach((role) => {
        role.checked = this.isUserInRole(role.name);
      });
      console.log(this.roles);
    }
  }

  isUserInRole(roleName: string): boolean {
    return this.newUser.roles.map((role) => role.name).includes(roleName);
  }

  isAdmin(): boolean {
    return this.tokenStorageService.getAuthorities().includes('ADMIN');
  }

  save(): void {
    // add checked roles to user
    if (this.isAdmin()) {
      this.newUser.roles = this.roles.filter((role) => role.checked === true);
      console.log(this.newUser);
    }

    // send updated details to the back end
    this.userService.updateUserDetails(this.newUser.id, this.newUser).subscribe(
      (data) => {
        // tslint:disable-next-line: no-string-literal
        this.successMessage = data['body'];
        const redirect = this.isAdmin() ? 'admin' : 'home';
        this.router.navigateByUrl(redirect);
      },
      (error) => {
        console.log(error);
        this.errorMessage = `${error.status}: ${error.message}`;
      }
    );
  }
}
