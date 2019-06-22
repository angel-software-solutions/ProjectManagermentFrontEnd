import { Component, OnInit } from "@angular/core";
import { CustomerService } from "../../services/customer.service";
import { CustomerModel } from "src/app/models/customer-model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { HandleHttpErrorsService } from "../../services/handle-http-errors.service";
@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.sass"]
})
export class CustomersComponent implements OnInit {
  public newModal: CustomerModel = new CustomerModel();
  public customer: CustomerModel;
  public customerProfilePicture;
  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal,
    private toasterService: ToastrService,
    private handleHttpError: HandleHttpErrorsService
  ) {}

  ngOnInit() {
    this.loadCustomerData();
  }

  private loadCustomerData() {
    let Query = {
      Guid: "EC92D9BF-6677-4FA8-8786-0E1C6E57AF9B"
    };

    this.customerService.getCustomerData(Query).then(
      success => {
        this.customer = success["guid"];
      },
      error => {
        this.handleHttpError.handleHttpError(error);
      }
    );
  }

  public addCustomerEntry() {
    this.customerService
      .createCustomer(this.newModal, this.customerProfilePicture)
      .then(() => {
        this.toasterService.success("Customer Created.");
      });
  }

  public onImageUploadedEventListener(event) {
    console.log("onImageUploadedEventListener", event);
    this.customerProfilePicture = event.file[0];
  }
}
