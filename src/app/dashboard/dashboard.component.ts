import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {AuthService} from '../auth.service';
import {User} from '../user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private users: User[];

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  addUser() {
    this.userService.addUser({name: 'Lisa', username: 'lisa', password: 'lisa'} as User)
      .subscribe((newUser: User) => this.users.push(newUser));
  }

  remove(id: number) {
    this.userService.deleteHero(id)
      .subscribe(() => this.users = this.users.filter(user => user.id !== id));
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

}
