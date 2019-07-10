import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Project} from '../models/project.model';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService,
              private authService: AuthService,
              private modalService: NgbModal) {  }

  ngOnInit() {
    this.projectService.getProjects()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
      });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  // Show modal form with information about user
  showInfo(user: User): void {
    // const modalRef = this.modalService.open();
    // modalRef.componentInstance.user = user;
  }
}
