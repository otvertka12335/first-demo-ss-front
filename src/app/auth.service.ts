import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {User} from './user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService,
              private router: Router) {
  }

  login(username: string, password: string): void {
    this.userService.hasUser(username, password)
      .subscribe((response: boolean) => {
        if (response) {
          localStorage.setItem('isAuth', 'true');
          this.router.navigate(['dashboard']);
        }
      });
  }
}
