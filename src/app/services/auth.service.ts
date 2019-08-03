import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  constructor(private userService: UserService,
              private router: Router,
              private http: HttpClient,
              private toast: ToastrService,
              private afAuth: AngularFireAuth) {
  }

  // Check existence of token
  static isAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem('pgUser'));
  }

  login(username: string, password: string) {
    return this.http.post('/users/login', {
      username,
      password
    });
  }

  register(username: string, name: string, password: string) {
    return this.http.post('/users', {
      username,
      name,
      password
    });
  }

  async logout() {
    this.afAuth.auth.signOut();
    localStorage.clear();
    this.loggedIn.next(false);
  }

  setStorage(token) {
    const jwt = new JwtHelperService();
    const decodedToken = jwt.decodeToken(token);
    this.userService.setUserToStorage(decodedToken.username);
  }
}
