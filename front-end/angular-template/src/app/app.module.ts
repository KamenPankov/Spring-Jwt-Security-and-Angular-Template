import { httpInterceptorProviders } from './auth/auth-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [						
    AppComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      AdminComponent,
      UserComponent,
      RoleComponent,
      UserDetailsComponent,
      FooterComponent,
      HeaderComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
