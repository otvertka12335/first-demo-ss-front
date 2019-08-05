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
import {Subject} from 'rxjs';
import {ToastService} from '../../services/toast.service';
import {ConfirmComponent} from '../../modals/confirm/confirm.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // CONSTANTS
  private dialogWidth = '450px';
  maxDescriptionLength = 35;
  pgUser = this.userService.getPgUserFromStorage();
  length: any;


  projects: Project[];
  user: User;
  displayedColumns: string[] = ['name', 'description', 'creator', 'actions'];
  dataSource: any;

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
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllProjectForUser(this.pgUser.id);
  }

  setData() {
    this.dataSource = new MatTableDataSource(this.projects);
    this.length = this.dataSource.data.length;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.emptyFlag = !this.dataSource.data.length;
  }

  // Open new page with project details
  showInfo(project): void {
    this.projectService.changeProjectData(project);
    this.router.navigateByUrl(`/project/${project.id}`);
  }

  addProject() {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      width: this.dialogWidth
    });
    dialogRef.componentInstance.project = {
      userId: this.userService.getPgUserFromStorage().id
    };
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
      width: this.dialogWidth
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
      width: this.dialogWidth,
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

  searchProjects(searchValue: string) {
    if (searchValue.length !== 0) {
      this.getAllProjectForUserUsingSearch(this.pgUser.id, searchValue);
    } else {
      this.getAllProjectForUser(this.pgUser.id);
    }
  }

  getAllProjectForUser(id) {
    this.projectService.getProjectsByUser(id).subscribe((projects: any) => {
      this.projects = projects.data;
      this.setData();
    });
  }

  getAllProjectForUserUsingSearch(id, searchString) {
    this.projectService.searchProject(id, searchString).subscribe((res: any) => {
      this.projects = res.data;
      this.setData();
    });
  }


}
