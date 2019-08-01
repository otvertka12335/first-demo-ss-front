import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

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
      this.loggedIn.next(true);
    });
  }

  async register(email: string, password: string, name: string) {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.userService.addUser(email, name).subscribe((res: any) => {
        // this.sendEmailVerification();
        this.toast.success(res.message, 'Registration Success');
        this.router.navigateByUrl('/login');
      });
    });
  }

  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['verify-email']);
  }

  async logout() {
    this.afAuth.auth.signOut();
    // localStorage.removeItem('user');
    // localStorage.removeItem('pgUser');
    localStorage.clear();
    this.loggedIn.next(false);
  }
}
