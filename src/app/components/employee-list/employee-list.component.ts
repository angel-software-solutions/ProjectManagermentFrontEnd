import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TableColumnDefinition } from "../../models/table-column-definition";
import { EmployeeService } from "../../services/employee.service";
import { HandleHttpErrorsService } from "../../services/handle-http-errors.service";
import { from } from "rxjs";
import { error } from "@angular/compiler/src/util";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.sass"]
})
export class EmployeeListComponent implements OnInit {
  employeeColumns: Array<TableColumnDefinition> = [];
  employeeActionColumns: Array<TableColumnDefinition> = [];
  public rowData: Array<any>;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private handelHtttpError: HandleHttpErrorsService
  ) {
    this.employeeColumns.push({
      columnHeading: "Name",
      dataType: "string",
      dbColumnName: "FirstName",
      id: "name"
    });
    this.employeeActionColumns.push({
      columnHeading: "",
      dataType: "button",
      dbColumnName: "Edit",
      id: "edit"
      //iconClass: "fa-edit"
    });
  }

  ngOnInit() {
    this.loadEmployees();
  }
  onCreateEmployee() {
    this.router.navigate(["employees", "new"]);
  }

  private loadEmployees() {
    this.employeeService.getAllEmployees().then(
      (success: Array<any>) => {
        success.forEach(item => {
          item.FirstName = item.FirstName + " " + item.LastName;
        });
        this.rowData = success;
      },
      error => {
        this.handelHtttpError.handleHttpError(error);
      }
    );
  }
}
