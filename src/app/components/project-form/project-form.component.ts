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
import { EnumUtility } from "src/app/Helpers/EnumUtility";
import {
  InvoiceFrequency,
  InvoiceFrequencies
} from "src/app/Enums/InvoiceFrequency";
import { Currency } from "src/app/models/currency.model";
import { CurrencyService } from "src/app/services/currency.service";
import { Industry } from "src/app/models/industry.model";
import { Scope } from "src/app/models/scope.model";
import { ScopeService } from "src/app/services/scope.service";
import { IndustryService } from "src/app/services/industry.service";

@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  styleUrls: ["./project-form.component.sass"]
})
export class ProjectFormComponent implements OnInit {
  /* #region  Property Declaration */
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
  selectedTeamLead: Employee;
  employees: Array<Employee>;
  budgetViews: any;
  selectedBudgetView: any;
  selectedCurrency: Currency;
  currencies: Array<Currency>;

  selectedIndustry: Industry;
  industries: Array<Industry>;

  selectedScope: Scope;
  scopes: Array<Scope>;
  itemsAsObjects = [
    { value: 0, display: "Angular" },
    { value: 1, display: "React" }
  ];
  /* #endregion */

  constructor(
    private ps: ProjectsService,
    private customerService: CustomerService,
    private customerContactService: CustomercontactService,
    private employeeService: EmployeeService,
    private currencyService: CurrencyService,
    private scopeService: ScopeService,
    private industryService: IndustryService
  ) {}

  ngOnInit() {
    this.selectedCustomer = new CustomerModel();
    this.onLoadProjectTypes();
    this.onLoadProjectStatues();
    this.onLoadCustomers();
    this.onLoadEmployees();
    this.onLoadCurrencies();
    this.onLoadScopes();
    this.onLoadIndustries();
    this.budgetViews = EnumUtility.GetList(InvoiceFrequency);
  }
  onLoadIndustries() {
    this.industryService.getIndustriesForDropDown().then(res => {
      this.industries = res;
    });
  }
  onLoadScopes() {
    this.scopeService.getScopesForDropDown().then(res => {
      this.scopes = res;
    });
  }
  onLoadCurrencies() {
    this.currencyService
      .getCurrencyForDropDown()
      .then(res => (this.currencies = res));
  }

  onLoadProjectTypes = () => {
    this.ps.getProjectTypes().then(res => (this.pts = res));
  };

  onLoadProjectStatues = () => {
    this.ps.getProjectStatuses().then(res => (this.psts = res));
  };

  onLoadCustomers = () => {
    this.customerService.getAllCustomers().then(res => {
      this.customers = res;
      this.selectedCustomer = res[1];
    });
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
    console.log(InvoiceFrequency[this.selectedBudgetView.Value]);
  }
}
