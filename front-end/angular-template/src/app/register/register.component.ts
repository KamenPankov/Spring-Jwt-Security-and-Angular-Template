import { AuthService } from './../auth/auth.service';
import { SignupData } from './../auth/signup-data';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signUpData: SignupData;
  isSignedUp = false;
  isSignedUpFailed = false;
  errorMessage = '';
  isPasswordsMatch = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  signup(): void {
    if (this.form === undefined) {
      return;
    }

    Object.entries(this.form).forEach(([key, value]) => {
      if (value === '') {
        return;
      }
    });

    this.isPasswordsMatch = false;

    if (this.form.password !== this.form.confirmPassword) {
      this.isPasswordsMatch = true;
      return;
    }

    this.signUpData = new SignupData(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      this.form.confirmPassword
    );

    this.authService.signUp(this.signUpData).subscribe(
      (data) => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignedUpFailed = false;
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.message;
        this.isSignedUpFailed = true;
      }
    );
  }
}
