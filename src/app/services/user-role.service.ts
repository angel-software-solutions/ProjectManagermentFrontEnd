import { Injectable } from "@angular/core";
import { AppRestService } from "./app-rest.service";
import { UserRole } from "../models/user-role-model";

@Injectable({
  providedIn: "root"
})
export class UserRoleService {
  private apiUrl: string = "api/userrole/";

  constructor(private httpService: AppRestService) {}

  public getUserRolesForDropDown(): Promise<Array<UserRole>> {
    return new Promise((onRequestAccepted, onRequestRejected) => {
      this.httpService.doGet(this.apiUrl).subscribe(
        userroles => {
          let _userroles = new Array<UserRole>();
          Object.assign(_userroles, userroles);
          let defaultUserRole = new UserRole();
          defaultUserRole.Name = "--Select--";
          _userroles = [...[defaultUserRole], ..._userroles];

          onRequestAccepted(_userroles);
        },
        error => {
          onRequestRejected(null);
        }
      );
    });
  }
}
