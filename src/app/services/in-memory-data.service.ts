import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

// Fake backend
export class InMemoryDataService implements InMemoryDbService {

  constructor() {
  }

  createDb() {
    const users: User[] = [
      new User(1, 'Rick Sanchez', 'rick', 'rick'),
      new User(2, 'Morty Smith', 'morty', 'morty'),
      new User(3, 'Homer Simpson', 'homer', 'homer'),
      new User(4, 'Bart Simpson', 'elbarto', 'elbarto'),
    ];
    return {users};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
}
