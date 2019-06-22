import { Injectable } from "@angular/core";
import { AppRestService } from "./app-rest.service";
import { CustomerModel } from "../models/customer-model";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private customerAPI: string = "api/customer/";

  constructor(private appRestService: AppRestService) {}

  public getCustomerData(queryParams: any) {
    return new Promise((onResolve, onReject) => {
      this.appRestService
        .doGet(this.customerAPI + "GetAllCustomers", queryParams)
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
}
