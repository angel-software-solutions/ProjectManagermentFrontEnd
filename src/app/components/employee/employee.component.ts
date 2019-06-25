import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";
import { from } from "rxjs";
import { EmployeesModel } from "src/app/models/employee";
import { EmployeeService } from "../../services/employee.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.sass"]
})
export class EmployeeComponent implements OnInit {
  public newModal: EmployeesModel = new EmployeesModel();

  status: SelectItem[];
  selectedStatus: any;

  licenseType: SelectItem[];
  selectedLicenseType: any;

  constructor(
    private employeeService: EmployeeService,
    private toasterService: ToastrService
  ) {
    this.status = [
      { label: "Active", value: 1 },
      { label: "Inactive", value: 2 }
    ];
    this.licenseType = [
      { label: "Professional", value: 1 },
      { label: "Executive", value: 2 }
    ];
  }

  public addEmployee() {
    this.employeeService.createEmployee(this.newModal).then(() => {
      this.toasterService.success("Employee Created.");
    });
  }

  ngOnInit() {}
}
