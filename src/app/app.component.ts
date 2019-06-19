import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from "./services/auth.service";

import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private router: Router,
              private authService: AuthService) {
    this.subscribeToRouterEvents();
    if (!authService.isUserAuthenticated()) {
      router.navigate(['login']);
    }
  }

  private subscribeToRouterEvents() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (this.authService.isUserAuthenticated() && event.url == '/') {
        this.router.navigate(['timesheet']);
      } else if (!this.authService.isUserAuthenticated()) {
        this.router.navigate(['login']);
      }
    });
  }
}
