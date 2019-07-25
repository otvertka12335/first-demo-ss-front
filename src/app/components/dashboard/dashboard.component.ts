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
import {Subscription} from 'rxjs';
import {MediaChange, MediaObserver} from '@angular/flex-layout';

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
  currentScreenWidth = '';
  flexMediaWatcher: Subscription;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private projectService: ProjectService,
              private authService: AuthService,
              private userService: UserService,
              private modalService: NgbModal,
              private router: Router,
              private mediaObserver: MediaObserver) {
    this.flexMediaWatcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias !== this.currentScreenWidth) {
        this.currentScreenWidth = change.mqAlias;
        this.setupTable();
      }
    }); // Be sure to unsubscribe from this in onDestroy()!
  }

  ngOnInit() {
    const user = this.userService.getPgUserFromStorage();
    this.projectService.getProjectsByUser(user.id)
      .subscribe((projects: any) => {
        this.projects = projects.data;
        console.log(projects);
        this.setData();
      });
  }

  setData() {
    this.dataSource = new MatTableDataSource(this.projects);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  setupTable() {
    this.displayedColumns = ['id', 'name', 'description', 'creator', 'actions'];
    if (this.currentScreenWidth === 'xs') { // only display internalId on larger screens
      this.displayedColumns.shift();
      this.displayedColumns = this.displayedColumns.filter(res => {
        return res !== 'description';
      });
    }
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
          this.projectService.getProjectById(res.data.id).subscribe(newRes => {
            this.projects.unshift(newRes.data);
            this.setData();
          });
        });
    }).catch(() => {
    });
  }

  editProject(project) {
    const modalRef = this.modalService.open(CreateProjectComponent);
    modalRef.componentInstance.project = project;
    modalRef.result.then((editedProject: Project) => {
      this.projectService.editProject(editedProject)
        .subscribe(() => {
          const userIndex = this.projects.findIndex(p => p.id === editedProject.id);
          this.projectService.getProjectById(editedProject.id).subscribe(res => {
            this.projects.splice(userIndex, 1, res.data);
            this.setData();
          });
        });
    }).catch(() => {
    });
  }

  removeProject(id: number) {
    this.projectService.deleteProject(id).subscribe(res => {
      this.projects = this.projects.filter(project => project.id !== id);
      this.setData();
    });
  }
}
