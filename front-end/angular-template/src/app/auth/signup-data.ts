export class SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor (name: string, username: string, email: string, password: string, confirmPassword: string) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
