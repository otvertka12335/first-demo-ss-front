import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) {
  }

  getTeamOfProject(projectId: number): Observable<Team[]> {
    return this.http.get(`/teams/project/${projectId}`);
  }

}
