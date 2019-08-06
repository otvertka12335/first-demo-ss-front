import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser$ = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('pgUser')));

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/users');
  }

  getUsersWithOutCurrent(id): Observable<User[]> {
    return this.http.get<User[]>(`/users/without/${id}`);
  }

  addUser(username: string, name: string) {
    const body = {
      username,
      name,
    };
    return this.http.post('/users', body);
  }

  getPgUserFromStorage(): User {
    return JSON.parse(localStorage.getItem('pgUser'));
  }

  setUserToStorage(email: string): void {
    this.http.get(`/users/email/${email}`).subscribe((res: any) => {
      localStorage.setItem('pgUser', JSON.stringify(res.data));
      this.currentUser$.next(res.data);
      this.router.navigate(['dashboard']);
    });
  }
}
