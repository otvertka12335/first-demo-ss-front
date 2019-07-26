import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {TeamService} from '../../services/team.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../models/project.model';
import {ResizedEvent} from 'angular-resize-event';
import {MatDialog} from '@angular/material';
import {TeamComponent} from '../../modals/team/team.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: Project;
  maintainers = [];
  developers = [];
  private mobile = true;

  constructor(private projectService: ProjectService,
              private teamService: TeamService,
              private router: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.checkScreen();
    this.getProject();
    this.getTeam();
  }

  getTeam() {
    this.developers = [];
    this.maintainers = [];
    this.teamService.getTeamOfProject(this.router.snapshot.params.id).subscribe((res: any) => {
      res.data.map((filtered) => {
        if (filtered.role === 'maintainer') {
          this.maintainers.push(filtered);
        } else {
          this.developers.push(filtered);
        }
      });
    });
  }

  getProject() {
    this.projectService.currentProject.subscribe((res: any) => {
      if (res) {
        this.project = res;
      } else {
        this.projectService.getProjectById(this.router.snapshot.params.id).subscribe((project: any) => {
          this.project = project.data;
        });
      }
    });
  }

  checkScreen() {
    if (window.screen.width <= 450) { // 768px portrait
      this.mobile = false;
    }
  }

  onResized(event: ResizedEvent) {
    event.newWidth <= 450 ? this.mobile = false : this.mobile = true;
  }

  addTeamMates() {
    const dialogRef = this.dialog.open(TeamComponent, {
      width: '600px',
      data: {id: this.router.snapshot.params.id}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.status) {
        this.teamService.addTeamToProject(res.id, res.mai, res.dev).subscribe((data: any) => {
          this.getTeam();
        });
      }
    });
  }
}
