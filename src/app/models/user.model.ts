export class User {
  constructor(
    public id: number,
    public name: string,
    public username: string,
    public password: string,
    public phoneNumbers: Array<string>,
    public hobbies: Array<string>,
    public address: string,
  ) {
  }
}
