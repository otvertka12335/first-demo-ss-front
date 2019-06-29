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

  static isAuthenticated(): boolean {
    return !!localStorage.getItem('isAuth');
  }

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

  async logout() {
    localStorage.clear();
    await this.router.navigate(['login']);
  }
}
