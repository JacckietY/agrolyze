import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agrolyze';

  constructor(
    private readonly router: Router,
    public authService: AuthService
  ) {
    
  }

  public logOut() {
    this.authService.logout();
    this.router.navigateByUrl('sign-in');
  }
}
