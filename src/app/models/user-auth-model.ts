export class UserAuthModel {
  employeeGuid: string;
  authToken: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  role: string;
  username: string;

  constructor(values: Object | null) {
    if (values) {
      this.employeeGuid = values['employeeGuid'];
      this.authToken = values['authToken'];
      this.firstName = values['firstName'];
      this.lastName = values['lastName'];
      this.emailAddress = values['emailAddress'];
      this.role = values['role'];
      this.username = values['username'];
    }
  }
}
