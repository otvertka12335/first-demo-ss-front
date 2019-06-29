import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;
  private badCredentials: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.username, this.password)
      .then((value: boolean) => {
        this.badCredentials = !value;
      });
  }
}
