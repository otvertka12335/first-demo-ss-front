import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  badCredentials: boolean;
  private showSpinner = false;

  constructor(private authService: AuthService,
              private toast: ToastrService) {
  }

  ngOnInit() {
  }

  login(): void {
    this.showSpinner = true;
    this.authService.login(this.username, this.password).then(
      res => {
      },
      err => {
        this.showSpinner = false;
        this.toast.error(err, 'Login Error');
      }
    );
  }
}
