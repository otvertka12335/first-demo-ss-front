import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) {
  }

  getTeamOfProject(projectId: number): Observable<any> {
    return this.http.get(`/teams/project/${projectId}`);
  }

}
