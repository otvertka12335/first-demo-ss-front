import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Project} from '../../models/project.model';
import {ProjectService} from '../../services/project.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {CreateProjectComponent} from '../../modals/create-project/create-project.component';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: Project[];
  user: User;
  displayedColumns: string[] = ['id', 'name', 'description', 'creator', 'actions'];
  dataSource;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private projectService: ProjectService,
              private authService: AuthService,
              private userService: UserService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit() {
    const user = this.userService.getPgUserFromStorage();
    this.projectService.getProjectsByUser(user.id)
      .subscribe((projects: any) => {
        this.projects = projects.data;
        this.setData();
      });
  }

  // Open new page with project details
  showInfo(project): void {
    this.projectService.changeProjectData(project);
    this.router.navigateByUrl(`/project/${project.id}`);
  }

  addProject() {
    const modalRef = this.modalService.open(CreateProjectComponent);
    modalRef.componentInstance.project = {};
    modalRef.result.then((newProject: Project) => {
      this.projectService.create(newProject)
        .subscribe((res: any) => {
          this.projects.unshift(res.data);
          this.setData();
        });
    }).catch(() => {
    });
  }

  removeProject(projectId: number) {
    console.log(projectId);
    //  request to delete with id
  }

  setData() {
    this.dataSource = new MatTableDataSource(this.projects);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
