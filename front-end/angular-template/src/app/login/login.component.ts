import { TokenStorageService } from './../auth/token-storage.service';
import { AuthService } from './../auth/auth.service';
import { SignInData } from './../auth/sign-in-data';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private signInData: SignInData;

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getAuthorities();
    }
  }

  login(): void {
    this.signInData = new SignInData(this.form.username, this.form.password);

    this.authService.signIn(this.signInData).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUserId(data.id);
        this.tokenStorageService.saveUsername(data.username);
        this.tokenStorageService.saveAuthorities(data.authorities);

        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = this.tokenStorageService.getAuthorities();
        console.log(this.roles);

        this.router.navigateByUrl('/home');
      },
      error => {
        console.log(error);

        this.errorMessage = error.message;
        this.isLoggedIn = false;
        this.isLoginFailed = true;
      }
    );
  }
}
