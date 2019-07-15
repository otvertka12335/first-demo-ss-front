import { Component, OnInit } from '@angular/core';
import {Project} from '../models/project.model';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  flag = true;
  projects: any[];
  project = {
    id: 1,
    name: 'Test name',
    description: `He do subjects prepared bachelor juvenile ye oh. He feelings removing informed he as ignorant we prepared.
                    Evening do forming observe spirits is in. Country hearted be of justice sending. On so they as with room cold ye.
                    Be call four my went mean. Celebrated if remarkably especially an. Going eat set she books found met aware.
                    In alteration insipidity impression by travelling reasonable up motionless.
                    Of regard warmth by unable sudden garden ladies. No kept hung am size spot no.
                    Likewise led and dissuade rejoiced welcomed husbands boy. Do listening on he suspected resembled.
                    Water would still if to. Position boy required law moderate was may.`,
    creator: 'vkravchik'
  };

  constructor() {  }

  ngOnInit() {
  }

  myFunc() {
    this.flag = !this.flag;
  }
}
