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
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

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
    // const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
    //   this.loggedIn.next(true);
    // });
    return this.http.post('/users/login', {
      username,
      password
    });
  }

  register(username: string, name: string, password: string) {
    // const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
    //   this.userService.addUser(email, name).subscribe((res: any) => {
    //     // this.sendEmailVerification();
    //     this.toast.success(res.message, 'Registration Success');
    //     this.router.navigateByUrl('/login');
    //   });
    // });
    return this.http.post('/users', {
      username,
      name,
      password
    });
  }

  async logout() {
    this.afAuth.auth.signOut();
    // localStorage.removeItem('user');
    // localStorage.removeItem('pgUser');
    localStorage.clear();
    this.loggedIn.next(false);
  }

  setStorage(token) {
    const jwt = new JwtHelperService();
    const decodedToken = jwt.decodeToken(token);
    this.userService.setUserToStorage(decodedToken.username);
  }
}
