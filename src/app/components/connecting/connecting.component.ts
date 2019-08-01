import {Component, OnInit, ViewChild} from '@angular/core';
import {TeamService} from '../../services/team.service';
import {Project} from '../../models/project.model';
import {User} from '../../models/user.model';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from '../../services/user.service';
import {ProjectService} from '../../services/project.service';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ToastService} from '../../services/toast.service';
import {CreateProjectComponent} from '../../modals/create-project/create-project.component';
import {ConfirmComponent} from '../../modals/confirm/confirm.component';

@Component({
  selector: 'app-connecting',
  templateUrl: './connecting.component.html',
  styleUrls: ['./connecting.component.css']
})
export class ConnectingComponent implements OnInit {

  projects: Project[];
  user: User;
  displayedColumns: string[] = ['name', 'description', 'creator', 'actions'];
  dataSource;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private teamService: TeamService,
              private userService: UserService,
              private projectService: ProjectService,
              private authService: AuthService,
              private router: Router,
              private toast: ToastService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.setData();
  }

  setData() {
    const user = this.userService.getPgUserFromStorage();
    this.teamService.getAProjectWhereUserExist(user.id).subscribe((res: any) => {
      this.projects = res.data;
      console.log(this.projects);
      this.dataSource = new MatTableDataSource(this.projects);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

//  CRUD OPERATION

  // Open new page with project details

  editProject(project) {
    project = project.project_id;
    // const dialogRef = this.dialog.open(CreateProjectComponent, {
    //   width: '450px',
    // });
    // dialogRef.componentInstance.project = project;
    // dialogRef.afterClosed().subscribe((data: any) => {
    //   if (data.result) {
    //     let editedProject: Project;
    //     editedProject = {
    //       id: data.id,
    //       name: data.name,
    //       description: data.description,
    //       userId: data.userId,
    //     };
    //     this.projectService.editProject(editedProject)
    //       .subscribe(() => {
    //         const userIndex = this.projects.findIndex(p => p.id === editedProject.id);
    //         this.projectService.getProjectById(editedProject.id).subscribe(res => {
    //           this.projects.splice(userIndex, 1, res.data);
    //           this.setData();
    //           this.toast.showSuccess('Project successfully edited', 'Project');
    //         });
    //       });
    //   } else {
    //     this.toast.showInfo(`You don't save project`, 'Create Project');
    //   }
    // });
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

}
