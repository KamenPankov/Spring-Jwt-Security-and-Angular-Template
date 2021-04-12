import { TokenStorageService } from './../auth/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Spring with Angular';

  isLoggedIn = false;
  username = '';

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken() && this.tokenStorageService.getUsername()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorageService.getUsername();
    }
  }

}
