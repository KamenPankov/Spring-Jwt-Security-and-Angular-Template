import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  content: string;
  errorMessage: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAdminArea().subscribe(
      data => {
        // tslint:disable-next-line: no-string-literal
        this.content = data['body'];
      },
      error => {
        console.log(error);
        this.errorMessage = `${error.status}: ${error.message}`;
      }
    );
  }

}
