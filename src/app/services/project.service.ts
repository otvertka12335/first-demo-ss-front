import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectUrl = environment.Projects;

  constructor(private http: HttpClient) { }

  // GET: get all projects current user
  getProjectsByUser(id: number): Observable<any> {
    return this.http.get(`${this.projectUrl}/${id}`);
  }

  getProjects(): Observable<any> {
    return this.http.get(this.projectUrl);
  }

}
