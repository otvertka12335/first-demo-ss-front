import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService,
              private router: Router) {
  }

  // Check existence of token
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('isAuth');
  }

  // If we have that user than save token and redirect to dashboard
  async login(username: string, password: string): Promise<boolean> {
    let result = false;
    await this.userService.hasUser(username, password)
      .toPromise()
      .then(async (response: boolean) => {
        if (response) {
          localStorage.setItem('isAuth', 'true');
          await this.router.navigate(['dashboard']);
          result = true;
        }
      });
    return result;
  }

  // Logout user, clear local storage and redirect to login page
  async logout() {
    localStorage.clear();
    await this.router.navigate(['login']);
  }
}
