import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService,
              private router: Router,
              private http: HttpClient,
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
    return JSON.parse(localStorage.getItem('user'));
  }

  async login(email: string, password: string) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.userService.setUserToStorage(email);
    });
  }

  async register(email: string, password: string, name: string) {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.userService.addUser(email, name);
    });
    this.sendEmailVerification();
  }

  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['verify-email']);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('pgUser');
    this.router.navigate(['login']);
  }

}
