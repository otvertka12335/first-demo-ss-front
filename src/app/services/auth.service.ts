import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService,
              private router: Router,
              private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  private user: firebase.User;

  // Check existence of token
  static isAuthenticated(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  async login(email: string, password: string) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['dashboard']);
  }

  async register(email: string, password: string) {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.sendEmailVerification();
  }

  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['verify-email']);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  // If we have that user than save token and redirect to dashboard
  // async login(username: string, password: string): Promise<boolean> {
  //   let result = false;
  //   await this.userService.hasUser(username, password)
  //     .toPromise()
  //     .then(async (response: boolean) => {
  //       if (response) {
  //         localStorage.setItem('isAuth', 'true');
  //         await this.router.navigate(['dashboard']);
  //         result = true;
  //       }
  //     });
  //   return result;
  // }

  // // Logout user, clear local storage and redirect to login page
  // async logout() {
  //   localStorage.clear();
  //   await this.router.navigate(['login']);
  // }
}
