export class LoginModel {
  username: string;
  password: string;

  constructor(userName: string, password: string) {
    this.username = userName;
    this.password = password;
  }

  public getUserName(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password
  }

}
