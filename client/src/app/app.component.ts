import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuth = false;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe(x => {
      this.isAuth = x != null;
    });
  }

  onLogoutClicked() {
    this.authService.logout();
    this.router.navigate(['/', 'login']);
  }
}
