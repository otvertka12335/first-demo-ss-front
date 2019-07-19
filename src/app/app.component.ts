import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }


}
