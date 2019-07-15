import {User} from './user.model';

export class Project {
  constructor(
    private id: number,
    private name: string,
    private description: string,
    private createdAt: string,
    private user: User,
  ) {  }
}
