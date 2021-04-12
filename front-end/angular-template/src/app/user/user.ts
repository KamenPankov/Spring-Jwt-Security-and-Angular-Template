import { Role } from '../role/role';

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: Array<Role> = [];

  constructor(id, name, username, email, roles) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }

  public getRolesAsString(): string {
    return this.roles.map(role => role.name).join(', ');
  }
}
