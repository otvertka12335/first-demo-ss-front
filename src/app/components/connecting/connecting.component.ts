import { Component, OnInit } from '@angular/core';
import {TeamService} from '../../services/team.service';

@Component({
  selector: 'app-connecting',
  templateUrl: './connecting.component.html',
  styleUrls: ['./connecting.component.css']
})
export class ConnectingComponent implements OnInit {

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    // this.teamService.
  }

}
