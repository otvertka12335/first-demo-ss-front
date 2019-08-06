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
  private showSpinner = false;

  constructor(private authService: AuthService,
              private toast: ToastrService) {
  }

  ngOnInit() {
  }

  login(): void {
    this.showSpinner = true;

    this.authService.login(this.username, this.password).subscribe(
      (res: any) => {
        this.showSpinner = false;
        this.authService.setStorage(res.data);
        this.authService.loggedIn.next(true);
      },
      err => {
        this.showSpinner = false;
        this.toast.error('', 'Login Error');
      }
    );
  }
}
