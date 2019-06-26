import { Injectable } from "@angular/core";
import { AppRestService } from "./app-rest.service";
import { CustomerModel } from "../models/customer-model";
import { promise } from "protractor";
import { error } from "@angular/compiler/src/util";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private customerAPI: string = "api/customer/";
  public customer: CustomerModel;
  constructor(private appRestService: AppRestService) {}

  public getAllCustomers(): Promise<Array<CustomerModel>> {
    return new Promise((resolve, reject) => {
      this.appRestService.doGet(this.customerAPI).subscribe(
        c => {
          let _c = new Array<CustomerModel>();
          Object.assign(_c, c);
          resolve(_c);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  public getCustomerByGuid(customerGuid: string): Promise<CustomerModel> {
    return new Promise((onRequestAccepted, onRequestRejected) => {
      this.appRestService.doGet(this.customerAPI + customerGuid).subscribe(
        customer => {
          let customerModel = new CustomerModel();
          Object.assign(customerModel, customer);
          onRequestAccepted(customerModel);
        },
        error => {
          onRequestRejected(null);
        }
      );
    });
  }

  public createCustomer(model: CustomerModel, profilePicture) {
    return new Promise((onResolve, onReject) => {
      // const formData = new FormData();
      // formData.append("profilePicture", profilePicture, profilePicture.name);
      // let modelKeys = Object.keys(model    );
      // modelKeys.forEach(Key => {
      //   formData.append(Key, model[Key]);
      // });
      this.appRestService.doPost(this.customerAPI, model).subscribe(
        success => {
          onResolve(success);
        },
        error => {
          onReject(error);
        }
      );
    });
  }
  public updateCustomer(model: CustomerModel) {
    return new Promise((onResolve, onReject) => {
      this.appRestService.doPatch(this.customerAPI, model).subscribe(
        success => {
          onResolve(success);
        },
        error => {
          onReject(error);
        }
      );
    });
  }

  deleteCustomer(guid: Array<string>) {
    return new Promise((onResolve, onReject) => {
      this.appRestService
        .delete(this.customerAPI + "/" + guid.join(","))
        .subscribe(
          success => {
            onResolve(success);
          },
          error => {
            onReject(error);
          }
        );
    });
  }
}
