import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TableColumnDefinition } from "src/app/models/TableColumnDefinition";
import { CustomerModel } from "src/app/models/customer-model";
import { CustomerService } from "src/app/services/customer.service";
import { HandleHttpErrorsService } from "src/app/services/handle-http-errors.service";

@Component({
  selector: "app-customers-view",
  templateUrl: "./customers-view.component.html",
  styleUrls: ["./customers-view.component.sass"]
})
export class CustomersViewComponent implements OnInit {
  customerColumns: Array<TableColumnDefinition> = [];
  customerActionColumns: Array<TableColumnDefinition> = [];
  public customer: CustomerModel;
  public rowData: Array<any>;
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private handleHttpError: HandleHttpErrorsService
  ) {
    this.customerActionColumns.push({
      columnHeading: "",
      dataType: "button",
      dbColumnName: "Edit",
      id: "edit",
      iconClass: "fa-edit",
      styleClass: "btn-primary"
    });
    this.customerActionColumns.push({
      columnHeading: "",
      dataType: "button",
      dbColumnName: "Delete",
      id: "delete",
      iconClass: "fa-trash",
      styleClass: "btn-danger"
    });
    this.customerColumns.push({
      columnHeading: "NAME",
      dataType: "string",
      dbColumnName: "ClientName",
      id: "name"
    });
    this.customerColumns.push({
      columnHeading: "ADDRESS",
      dataType: "string",
      dbColumnName: "StreetAddress",
      id: "Address"
    });
  }

  ngOnInit() {
    this.loadCustomerData();
  }

  onCreateCustomer() {
    this.router.navigate(["customers", "new"]);
  }
  private loadCustomerData() {
    this.customerService.getAllCustomers().then(
      (success: Array<any>) => {
        success.forEach(item => {
          item.StreetAddress =
            item.StreetAddress +
            ", " +
            item.City +
            ", " +
            item.StateProvince +
            ", " +
            item.Country;
        });
        this.rowData = success;
      },
      error => {
        this.handleHttpError.handleHttpError(error);
      }
    );
  }
  public OnTableEventPerformed(event) {
    let button = event.actionButton;
    let row = event.rowItem;
    switch (button.id) {
      case "edit":
        this.OnEditActionPerformed(row);
        break;
      case "delete":
        this.OnDeleteActionPerformed(row);
        break;
      default:
        console.log("unknown action performed");
    }

    console.info(event);
  }
  private OnEditActionPerformed(row) {
    this.router.navigate(["customers/edit", row.Guid]);
  }
  private OnDeleteActionPerformed(row) {}
}
