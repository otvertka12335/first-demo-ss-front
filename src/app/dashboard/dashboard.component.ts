import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Project} from '../models/project.model';
import {ProjectService} from '../services/project.service';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: Project[];
  user: User;

  constructor(private projectService: ProjectService,
              private authService: AuthService,
              private userService: UserService,
              private modalService: NgbModal) {
    this.user = this.userService.getPgUserFromStorage();
  }

  ngOnInit() {
    this.projectService.getProjectsByUser(this.user.id)
      .subscribe((projects: any) => {
        this.projects = projects;
      });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  // Show modal form with information about user
  showInfo(project): void {
    // const modalRef = this.modalService.open();
    // modalRef.componentInstance.user = user;
  }

  // editProject(project: Project): void {
  //   const modalRef = this.modalService.open(UserFormComponent);
  //   modalRef.componentInstance.user = user;
  //   modalRef.result.then((editedProject: Project) => {
  //     this.projectService.editProject(editedProject)
  //       .subscribe(() => {
  //         const index = this.projects.findIndex((i: Project) => i.id === editedProject.id);
  //         this.projects.splice(index, 1, editedProject);
  //       });
  //   }).catch(() => {
  //   });
  // }
}
