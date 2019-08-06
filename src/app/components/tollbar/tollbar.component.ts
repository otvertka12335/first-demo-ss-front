import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tollbar',
  templateUrl: './tollbar.component.html',
  styleUrls: ['./tollbar.component.css']
})
export class TollbarComponent implements OnInit {


  loggedIn: boolean;
  currentUser = JSON.parse(localStorage.getItem('pgUser'));
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data) => {
      this.loggedIn = data;
    });


  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']);
    this.authService.loggedIn.next(false);
  }

}
