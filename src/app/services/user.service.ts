import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/users');
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
      this.router.navigate(['dashboard']);
    });
  }
}
