import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {TeamService} from '../../services/team.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../models/project.model';
import {ResizedEvent} from 'angular-resize-event';

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
              private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.checkScreen();
    this.getProject();
    this.getTeam();
  }

  getTeam() {
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
        this.projectService.getProjectById(this.router.snapshot.params.id).subscribe(project => {
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
}
