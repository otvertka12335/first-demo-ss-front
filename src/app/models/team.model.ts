import {User} from './user.model';
import {Project} from './project.model';

export class Team {
  constructor(
    public id: number,
    public project: Project,
    public user: User,
    public role: string
  ) {
  }
}
