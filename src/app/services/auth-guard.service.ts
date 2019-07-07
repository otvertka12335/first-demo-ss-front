import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return route.routeConfig.path === 'login' || route.routeConfig.path === 'registration'
      ? this.loginGuard() : this.dashBoardGuard();
  }

  // If don't logged he can open only login page
  async dashBoardGuard(): Promise<boolean> {
    if (!AuthService.isAuthenticated()) {
      await this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  // If user already logged he can't go to login page
  async loginGuard(): Promise<boolean> {
    if (AuthService.isAuthenticated()) {
      await this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
