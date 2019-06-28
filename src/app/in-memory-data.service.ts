import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() {
  }

  createDb() {
    const users: User[] = [
      new User('Rick Sanchez', 'rick', 'rick'),
      new User('Morty Smith', 'morty', 'morty'),
    ];
    return {users};
  }
}
