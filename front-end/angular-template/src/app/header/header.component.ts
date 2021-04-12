import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username = this.getUserName();

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    this.tokenStorageService.clearStorage();
    this.username = '';
    this.isLoggedIn();
    this.isAdmin();

    this.router.routeReuseStrategy.shouldReuseRoute = function(): boolean {
      return false;
    };
    this.router.onSameUrlNavigation = 'reload';

    this.router.navigateByUrl('/home');
  }

  isLoggedIn(): boolean {
    return this.tokenStorageService.getToken() !== null && this.tokenStorageService.getUsername() !== null;
  }

  getUserName(): string {
    return this.tokenStorageService.getUsername();
  }

  getUserId(): string {
    return this.tokenStorageService.getUserId();
  }

  getAuthorities(): string[] {
    return this.tokenStorageService.getAuthorities();
  }

  isAdmin(): boolean {
    return this.getAuthorities().includes('ADMIN');
  }
}
