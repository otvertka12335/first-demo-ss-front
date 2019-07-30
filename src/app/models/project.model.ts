import {User} from './user.model';

export class Project {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public userId: User,
    // public createdAt: string
  ) {  }
}
