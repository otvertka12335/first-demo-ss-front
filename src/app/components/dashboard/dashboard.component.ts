import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Project} from '../../models/project.model';
import {ProjectService} from '../../services/project.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {CreateProjectComponent} from '../../modals/create-project/create-project.component';
import {Router} from '@angular/router';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subject, Subscription} from 'rxjs';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {ToastService} from '../../services/toast.service';
import {ConfirmComponent} from '../../modals/confirm/confirm.component';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: Project[];
  user: User;
  displayedColumns: string[] = ['name', 'description', 'creator', 'actions'];
  dataSource;
  currentScreenWidth = '';
  flexMediaWatcher: Subscription;

  private subject: Subject<string> = new Subject();


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  emptyFlag: boolean;


  constructor(private projectService: ProjectService,
              private authService: AuthService,
              private userService: UserService,
              private modalService: NgbModal,
              private router: Router,
              private toast: ToastService,
              private dialog: MatDialog,
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
        this.setData();
      });

    // SEARCH WITH DEBOUNCE
    this.subject.pipe(
      filter(f => f.length > 2),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(searchTextValue => {
      console.log(searchTextValue);
    });
  }

  setData() {
    this.dataSource = new MatTableDataSource(this.projects);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.emptyFlag = !this.dataSource.data.length;
  }

  setupTable() {
    this.displayedColumns = ['name', 'description', 'creator', 'actions'];
    if (this.currentScreenWidth === 'xs') { // only display internalId on larger screens
      // this.displayedColumns.shift();
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
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      width: '450px'
    });
    dialogRef.componentInstance.project = {} as Project;
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data.result) {
        let newProject: Project;
        newProject = {
          id: data.id,
          name: data.name,
          description: data.description,
          userId: data.userId,
        };
        this.projectService.create(newProject)
          .subscribe(
            (res: any) => {
              this.projectService.getProjectById(res.data.id).subscribe(newRes => {
                this.projects.unshift(newRes.data);
                this.setData();
                this.toast.showSuccess('You have successfully created a project', 'Project');
              });
            },
            (error) => {
              this.toast.showError(error, 'Create Project');
            });
      } else {
        this.toast.showInfo(`You don't save project`, 'Create Project');
      }
    });
  }

  editProject(project) {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      width: '450px'
    });
    dialogRef.componentInstance.project = project;
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data.result) {
        let editedProject: Project;
        editedProject = {
          id: data.id,
          name: data.name,
          description: data.description,
          userId: data.userId,
        };
        this.projectService.editProject(editedProject)
          .subscribe(() => {
            const userIndex = this.projects.findIndex(p => p.id === editedProject.id);
            this.projectService.getProjectById(editedProject.id).subscribe(res => {
              this.projects.splice(userIndex, 1, res.data);
              this.setData();
              this.toast.showSuccess('Project successfully edited', 'Project');
            });
          });
      } else {
        this.toast.showInfo(`You don't save project`, 'Create Project');
      }
    });
  }

  removeProject(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this data?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(id).subscribe(() => {
          this.projects = this.projects.filter(project => project.id !== id);
          this.setData();
          this.toast.showSuccess('Project successfully deleted', 'Project');
        });
      } else {
        this.toast.showInfo(`You don't save project`, 'Create Project');
      }
    });
  }

  applyFilter(filterValue: string) {
    this.subject.next(filterValue);
  }


}
