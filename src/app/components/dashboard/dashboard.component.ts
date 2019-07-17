import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Project} from '../../models/project.model';
import {ProjectService} from '../../services/project.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {CreateProjectComponent} from '../../modals/create-project/create-project.component';

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
  }

  ngOnInit() {
    const user = this.userService.getPgUserFromStorage();
    this.projectService.getProjectsByUser(user.id)
      .subscribe((projects: any) => {
        this.projects = projects.data;
      });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  openProject(project): void {
  }

  addProject() {
    const modalRef = this.modalService.open(CreateProjectComponent);
    modalRef.componentInstance.project = {};
    modalRef.result.then((newProject: Project) => {
      this.projectService.create(newProject)
        .subscribe((res: any) => {
          this.projects.unshift(res.data);
        });
    }).catch(() => {
    });
  }

  removeProject(projectId: number) {
    console.log(projectId);
    //  request to delete with id
  }
}
