import { Injectable } from "@angular/core";
import { AppRestService } from "./app-rest.service";
import { Employee } from "../models/employee.model";
import { EmployeesModel } from "../models/employee";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  private apiUrl: string = "api/employee/";

  constructor(private httpService: AppRestService) {}

  public getEmployeesForDropDown(): Promise<Array<Employee>> {
    return new Promise((onRequestAccepted, onRequestRejected) => {
      this.httpService.doGet(this.apiUrl).subscribe(
        emps => {
          let _emps = new Array<Employee>();
          Object.assign(_emps, emps);
          let defaulSelectCustomerC = new Employee();
          defaulSelectCustomerC.FullName = "--Select--";
          _emps = [...[defaulSelectCustomerC], ..._emps];
          _emps.forEach(element => {
            if (element.FirstName && element.LastName)
              element.FullName = element.FirstName + " " + element.LastName;
          });
          onRequestAccepted(_emps);
        },
        error => {
          onRequestRejected(null);
        }
      );
    });
  }
  public createEmployee(model: EmployeesModel) {
    return new Promise((onResolve, onReject) => {
      this.httpService.doPost(this.apiUrl, model).subscribe(
        success => {
          onResolve(success);
        },
        error => {
          onReject(error);
        }
      );
    });
  }
  public getAllEmployees(): Promise<Array<EmployeesModel>> {
    return new Promise((resolve, reject) => {
      this.httpService.doGet(this.apiUrl).subscribe(
        c => {
          let _c = new Array<EmployeesModel>();
          Object.assign(_c, c);
          resolve(_c);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  public getAllEmployeesByTerms(searchQueryParams: any) {
    return new Promise((onResolved, onRejected) => {
      this.httpService
        .doGet(this.apiUrl + "byterm", searchQueryParams)
        .subscribe(success => onResolved(success), error => onRejected(error));
    });
  }

  public getAllInActiveEmployee() {
    return new Promise((onResolved, onRejected) => {
      this.httpService
        .doGet(this.apiUrl + "in-active")
        .subscribe(success => onResolved(success), error => onRejected(error));
    });
  }
}
