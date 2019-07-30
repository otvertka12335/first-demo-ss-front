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

  getAProjectWhereUserExist(id) {
    this.http.get('/connecting/projects');
  }

  addTeamToProject(id, maintainers, developers) {
    const body = {
      project: id,
      maintainers,
      developers
    };

    return this.http.post('/teams/addTeamMates', body);
  }

}
