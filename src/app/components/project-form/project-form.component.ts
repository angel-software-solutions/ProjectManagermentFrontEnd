import { Component, OnInit } from "@angular/core";
import { ProjectsService } from "src/app/services/projects.service";
import { ProjectType } from "src/app/models/projecttype";
import { Projectstatus } from "src/app/models/projectstatus";
import { CustomerService } from "src/app/services/customer.service";
import { CustomerModel } from "src/app/models/customer-model";

@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  styleUrls: ["./project-form.component.sass"]
})
export class ProjectFormComponent implements OnInit {
  spts: ProjectType;
  pts: Array<ProjectType>;
  spst: ProjectType;
  psts: Array<Projectstatus>;
  selectedCustomer: CustomerModel;
  customers: Array<CustomerModel>;

  constructor(
    private ps: ProjectsService,
    private customerService: CustomerService
  ) {
    this.selectedCustomer = new CustomerModel();
    this.onLoadProjectTypes();
    this.onLoadProjectStatues();
    this.onLoadCustomers();
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
  onFormSubmit() {
    console.log(this.selectedCustomer.ClientName);
  }
}
