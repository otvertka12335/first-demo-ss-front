import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  // GET: get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/users');
  }

  // Search user with given username and password
  hasUser(username: string, password: string): Observable<boolean> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.get<User[]>('/users', {params})
      .pipe(
        map((users: User[]) => users.length > 0)
      );
  }

  // POST: add new user
  addUser(user: User): Observable<User> {
    return this.http.post<User>('/users', user);
  }

  getPgUserFromStorage(): User {
    return JSON.parse(localStorage.getItem('pgUser'));

  }
}
