import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {TeamService} from '../../services/team.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Project} from '../../models/project.model';
import {Team} from '../../models/team.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  flag = true;
  project: Project;
  teams: Team[];
  maintainers = [];
  developers = [];

  constructor(private projectService: ProjectService,
              private teamService: TeamService,
              private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.projectService.currentProject.subscribe((res: any) => {
      if (res) {
        this.project = res;
      } else {
        this.projectService.getProjectById(this.router.snapshot.params.id).subscribe(project => {
          this.project = project.data;
        });
      }
    });

    this.teamService.getTeamOfProject(this.router.snapshot.params.id).subscribe((res: any) => {
      res.data.map((filtered) => {
        console.log(filtered);
        if (filtered.role === 'maintainer') {
          this.maintainers.push(filtered);
        } else {
          this.developers.push(filtered);
        }
      });
    });
  }

  myFunc() {
    this.flag = !this.flag;
  }
}
