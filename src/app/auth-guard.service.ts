import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (route.routeConfig.path === 'login') {
      return this.loginGuard();
    } else {
      return this.dashBoardGuard();
    }
  }

  dashBoardGuard() {
    const hasToken: boolean = !!localStorage.getItem('isAuth');

    if (!hasToken) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  loginGuard() {
    const hasToken: boolean = !!localStorage.getItem('isAuth');

    if (hasToken) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
