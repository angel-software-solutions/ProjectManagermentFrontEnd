import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";
import { from } from "rxjs";
import { EmployeesModel } from "src/app/models/employee";
import { EmployeeService } from "../../services/employee.service";
import { ToastrService } from "ngx-toastr";
import { UserRole } from "../../models/user-role-model";
import { UserRoleService } from "../../services/user-role.service";
import { LicenseTypes } from "../../Enums/LicenseTypes";
import { EnumUtility } from "src/app/Helpers/EnumUtility";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.sass"]
})
export class EmployeeComponent implements OnInit {
  public newModal: EmployeesModel = new EmployeesModel();

  status: SelectItem[];
  selectedStatus: any;

  licensetype: SelectItem[];
  //licensetype: any;
  selectedLicenseType: any;

  selectedUserRole: UserRole;
  userRoles: Array<UserRole>;

  constructor(
    private employeeService: EmployeeService,
    private userRoleService: UserRoleService,
    private toasterService: ToastrService
  ) {
    this.status = [
      { label: "Active", value: 1 },
      { label: "Inactive", value: 2 }
    ];
    this.licensetype = [
      { label: "Professional", value: 1 },
      { label: "Executive", value: 2 }
    ];
  }

  public addEmployee() {
    this.employeeService.createEmployee(this.newModal).then(() => {
      this.toasterService.success("Employee Created.");
    });
  }

  ngOnInit() {
    this.loadUserRoles();
    this.onFormSubmit();
    //this.licensetype = EnumUtility.GetDescription(LicenseTypes);
  }

  loadUserRoles() {
    this.userRoleService.getUserRolesForDropDown().then(res => {
      this.userRoles = res;
    });
  }

  onFormSubmit() {
    //console.log(this.selectedEmployee);
  }
}
