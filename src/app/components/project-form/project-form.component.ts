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
import { ProjecttagService } from "src/app/services/projecttag.service";
import { ProjectTag } from "src/app/models/project-tag.model";
import { ProjectModel } from "src/app/models/project-model";
import { GeographyService } from "src/app/services/geography.service";
import { Geography } from "src/app/models/geography.model";
import { TreeviewItem, TreeviewConfig } from "ngx-treeview";

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
  isProjectSave: boolean = true;
  selectedScope: Scope;
  scopes: Array<Scope>;

  projectTags: Array<ProjectTag> = [];
  selectedProject: ProjectModel;
  geographies: TreeviewItem[] = [];

  /* #endregion */

  constructor(
    private ps: ProjectsService,
    private customerService: CustomerService,
    private customerContactService: CustomercontactService,
    private employeeService: EmployeeService,
    private currencyService: CurrencyService,
    private scopeService: ScopeService,
    private industryService: IndustryService,
    private projectTagService: ProjecttagService,
    private geographyService: GeographyService
  ) {}

  ngOnInit() {
    this.selectedProject = new ProjectModel();
    this.selectedProject.TypeGuid = "57957D13-88FC-40E3-8B81-EBED3585323E";
    this.selectedCustomer = new CustomerModel();
    this.onLoadProjectTypes();
    this.onLoadProjectStatues();
    this.onLoadCustomers();
    this.onLoadEmployees();
    this.onLoadCurrencies();
    this.onLoadScopes();
    this.onLoadIndustries();
    this.onLoadProjectTags();
    this.onLoadGeographies();

    this.budgetViews = EnumUtility.GetList(InvoiceFrequency);
  }

  dropdownEnabled = true;
  items: TreeviewItem[];
  values: string[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 250
  });

  /* #region  DataLoad methods */
  onLoadGeographies() {
    this.geographyService.getGeographiesTreeView().then(res => {
      this.geographies.push(
        new TreeviewItem({
          text: res.Root.text,
          value: res.Root.value,
          children: res.Root.children
        })
      );
    });
  }
  onLoadProjectTags() {
    this.projectTagService
      .getAllProjectTagByProject("B18FB12D-D91F-40D5-A4A4-384E608630B2")
      .then(res => {
        this.projectTags = res;
        let defaultTag = new ProjectTag();
        defaultTag.Tag = "Tag1";
        defaultTag.Guid = "B18FB12D-D91F-40D5-A4A4-384E608630B2";
        this.projectTags.push(defaultTag);
      });
  }
  onFilterChange(value: string) {}
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

  onItemRemoved(event) {}

  onItemAdded(event) {}

  onFormSubmit() {
    console.log(this.selectedProject);
    //console.log(InvoiceFrequency[this.selectedBudgetView.Value]);
  }
  /* #endregion */
}
