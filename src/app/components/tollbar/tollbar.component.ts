import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-tollbar',
  templateUrl: './tollbar.component.html',
  styleUrls: ['./tollbar.component.css']
})
export class TollbarComponent implements OnInit {
  loggedIn: boolean;
  currentUser: any;

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data) => {
      this.loggedIn = data;
      // this.currentUser = JSON.parse(localStorage.getItem('pgUser'));
    });
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']);
    this.authService.loggedIn.next(false);
  }

}
