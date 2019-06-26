import { Component, OnInit, Input } from "@angular/core";
import { CustomerService } from "../../services/customer.service";
import { CustomerModel } from "src/app/models/customer-model";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { HandleHttpErrorsService } from "../../services/handle-http-errors.service";
import { TableColumnDefinition } from "src/app/models/table-column-definition";
import { CustomercontactService } from "src/app/services/customercontact.service";
import { CustomerContact } from "src/app/models/customer-contact.model";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ConfirmModalDialogComponent } from "src/app/common-components/modals/confirm-modal-dialog/confirm-modal-dialog.component";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.sass"]
})
export class CustomersComponent implements OnInit {
  public newModal: CustomerModel = new CustomerModel();
  public customer: CustomerModel;
  public customerContact: CustomerContact;
  public contactColumns: Array<TableColumnDefinition> = [];
  public rowData;
  public customerProfilePicture;
  customers: any = {};

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal,
    private ActivatedRoute: ActivatedRoute,
    private toasterService: ToastrService,
    private router: Router,
    private handleHttpError: HandleHttpErrorsService,
    private customercontactService: CustomercontactService
  ) {
    this.contactColumns.push(
      new TableColumnDefinition({
        columnHeading: "FIRST NAME",
        dataType: "text",
        dbColumnName: "FirstName",
        id: "1"
      }),
      new TableColumnDefinition({
        columnHeading: "LAST NAME",
        dataType: "text",
        dbColumnName: "LastName",
        id: "2"
      }),
      new TableColumnDefinition({
        columnHeading: "EMAIL ADDRESS",
        dataType: "text",
        dbColumnName: "EmailAddress",
        id: "3"
      }),
      new TableColumnDefinition({
        columnHeading: "PHONE NUMBER",
        dataType: "text",
        dbColumnName: "PhoneNumber",
        id: "4"
      }),
      new TableColumnDefinition({
        columnHeading: "CELL PHONE NUMBER",
        dataType: "text",
        dbColumnName: "CellPhoneNumber",
        id: "5"
      })
    );
  }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(params => {
      let guid = params["guid"];
      // this.loadCustomerContact(guid);
      if (guid && guid.length > 0) {
        this.getCustomerDetailsByGuid(guid);
        this.loadCustomerContact(guid);
      }
    });
  }

  private getCustomerDetailsByGuid(guid) {
    this.customerService.getCustomerByGuid(guid).then(
      success => {
        this.newModal = success;
      },

      () => {}
    );
  }
  public addCustomerEntry() {
    this.customerService
      .createCustomer(this.newModal, this.customerProfilePicture)
      .then(() => {
        this.toasterService.success("Customer Created.");
        this.router.navigate(["customers"]);
      });
  }

  // public updateCustomerEntry() {
  //   this.customerService.updateCustomer(this.newModal).then(() => {
  //     this.toasterService.success("Customer Updated.");
  //   });
  // }

  public DeleteCustomer() {
    const modelRef: NgbModalRef = this.modalService.open(
      ConfirmModalDialogComponent
    );
    modelRef.componentInstance.modelHeading = "Delete Customer";
    modelRef.componentInstance.modelBody =
      "Are you sure, you want to delete Customer?";
    modelRef.result.then(response => {
      if (response && response == true) {
      }
    });
  }

  public onImageUploadedEventListener(event) {
    console.log("onImageUploadedEventListener", event);
    this.customerProfilePicture = event.file[0];
  }

  public loadCustomerContact(guid) {
    this.customercontactService.getCustomerContacts(guid).then(res => {
      //   this.customerContact = res["guid"];
      this.rowData = res;
    });
  }
}
