import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'api/users';

  constructor(
    private http: HttpClient
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  hasUser(username: string, password: string): Observable<boolean> {
    const url = `${this.usersUrl}/?username=${username}&password=${password}`;
    return this.http.get<User[]>(url)
      .pipe(
        map((users: User[]) => users.length > 0)
      );
  }

  login(username: string, password: string) {
    localStorage.setItem('isAuth', 'true');
    this.hasUser(username, password);
    // this.router.navigate(['dashboard']);
  }

  logout() {
    localStorage.clear();
  }
}
