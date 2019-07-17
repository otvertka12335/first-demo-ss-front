import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  // GET: get all projects current user
  getProjectsByUser(id: number): Observable<any> {
    return this.http.get(`/projects/user/${id}`);
  }

  getProjects(): Observable<any> {
    return this.http.get('/projects');
  }

  create(project: Project): Observable<any> {
    return this.http.post('/projects', project);
  }
}
