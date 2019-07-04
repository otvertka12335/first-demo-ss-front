import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../models/user.model';
import {map} from 'rxjs/operators';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'api/users';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) {
  }

  // GET: get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  // Search user with given username and password
  hasUser(username: string, password: string): Observable<boolean> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.get<User[]>(this.usersUrl, {params})
      .pipe(
        map((users: User[]) => users.length > 0)
      );
  }

  // POST: add new user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  // PUT: edit given user
  editUser(user: User): Observable<User> {
    return this.http.put<User>(this.usersUrl, user, this.httpOptions);
  }

  // DELETE: delete user by id
  deleteHero(userId: number): Observable<User> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.delete<User>(url, this.httpOptions);
  }
}
