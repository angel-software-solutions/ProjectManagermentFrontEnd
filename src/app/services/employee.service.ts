import { Injectable } from "@angular/core";
import { AppRestService } from "./app-rest.service";
import { EmployeesModel } from "../models/employee";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  private employeeAPIEndPoint: string = "/api/employee/";

  constructor(private appRestService: AppRestService) {}

  public createEmployee(model: EmployeesModel) {
    return new Promise((onResolve, onReject) => {
      this.appRestService.doPost(this.employeeAPIEndPoint, model).subscribe(
        success => {
          onResolve(success);
        },
        error => {
          onReject(error);
        }
      );
    });
  }
}
