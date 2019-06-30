import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {AuthService} from '../auth.service';
import {User} from '../user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserFormComponent} from '../user-form/user-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  // Open modal where we can edit user and send result to user service
  editUser(user: User): void {
    const modalRef = this.modalService.open(UserFormComponent);
    modalRef.componentInstance.user = user;
    modalRef.result.then((editedUser: User) => {
      this.userService.editUser(editedUser)
        .subscribe(() => {
          const userIndex = this.users.findIndex((u: User) => u.id === editedUser.id);
          this.users.splice(userIndex, 1, editedUser);
        });
    }).catch(() => {});
  }

  // Open modal to add user and send result to user service
  addUser(): void {
    const modalRef = this.modalService.open(UserFormComponent);
    modalRef.componentInstance.user = {};
    modalRef.result.then((newUser: User) => {
      this.userService.addUser(newUser)
        .subscribe((userWithId) => {
          this.users.push(userWithId);
        });
    }).catch(() => {});
  }

  // Send user id to user service and remove him from table
  remove(id: number) {
    if (confirm('Are you sure want to delete user?')) {
      this.userService.deleteHero(id)
        .subscribe(() => this.users = this.users.filter(user => user.id !== id));
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
