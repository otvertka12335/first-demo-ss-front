import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Project} from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectData = new BehaviorSubject<Project>(null);
  currentProject = this.projectData.asObservable();


  constructor(private http: HttpClient) {
  }

  // GET: get all projects by id of user
  getProjectsByUser(id: number): Observable<any> {
    return this.http.get(`/projects/user/${id}`);
  }

  // get one project by id of project
  getProjectById(id: number): Observable<any> {
    return this.http.get(`/projects/${id}`);
  }

  getProjects(): Observable<any> {
    return this.http.get('/projects');
  }

  create(project: Project): Observable<any> {
    return this.http.post('/projects', project);
  }

  editProject(project: Project): Observable<any> {
    const id = project.id;
    return this.http.put(`/projects/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`/projects/${id}`);
  }

  // For change data bindig data
  changeProjectData(project: Project) {
    this.projectData.next(project);
  }
}
