import { Component, OnInit } from "@angular/core";
import { ProjectsService } from "src/app/services/projects.service";
import { ProjectType } from "src/app/models/projecttype";
import { Projectstatus } from "src/app/models/projectstatus";
import { CustomerService } from "src/app/services/customer.service";
import { CustomerModel } from "src/app/models/customer-model";
import { CustomerContact } from "src/app/models/customer-contact.model";
import { TimesheetHelperService } from "src/app/services/timesheet-helper.service";
import { CustomercontactService } from "src/app/services/customercontact.service";
import { Employee } from "src/app/models/employee.model";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  styleUrls: ["./project-form.component.sass"]
})
export class ProjectFormComponent implements OnInit {
  spts: ProjectType;
  pts: Array<ProjectType>;
  spst: Projectstatus;
  psts: Array<Projectstatus>;
  selectedCustomer: CustomerModel;
  customers: Array<CustomerModel>;
  selectedCustomerContact: CustomerContact;
  selectedBillingContact: CustomerContact;
  customerContacts: Array<CustomerContact>;
  selectedEmployee: Employee;
  employees: Array<Employee>;

  constructor(
    private ps: ProjectsService,
    private customerService: CustomerService,
    private customerContactService: CustomercontactService,
    private employeeService: EmployeeService
  ) {
    this.selectedCustomer = new CustomerModel();
    this.onLoadProjectTypes();
    this.onLoadProjectStatues();
    this.onLoadCustomers();
    this.onLoadEmployees();
  }

  ngOnInit() {}
  onLoadProjectTypes = () => {
    this.ps.getProjectTypes().then(res => (this.pts = res));
  };

  onLoadProjectStatues = () => {
    this.ps.getProjectStatuses().then(res => (this.psts = res));
  };

  onLoadCustomers = () => {
    this.customerService.getAllCustomers().then(res => (this.customers = res));
  };

  onLoadCustomerContacts() {
    this.customerContactService
      .getCustomerContactsForDropDown(this.selectedCustomer.Guid)
      .then(res => {
        this.customerContacts = res;
      });
  }

  onCustomerChange(e) {
    this.selectedCustomer = e.value;
    this.onLoadCustomerContacts();
  }

  onLoadEmployees() {
    this.employeeService.getEmployeesForDropDown().then(res => {
      this.employees = res;
    });
  }
  onFormSubmit() {
    console.log(this.selectedCustomer.ClientName);
  }
}
