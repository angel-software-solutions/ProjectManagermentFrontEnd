import { Injectable } from "@angular/core";
import { CustomerModel } from "../models/customer-model";
import { AppRestService } from "./app-rest.service";
import { promise, Key } from "protractor";
import { keyframes } from "@angular/animations";

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

  public createCustomer(model: CustomerModel, profilePicture) {
    return new Promise((onResolve, onReject) => {
      // const formData = new FormData();
      // formData.append("profilePicture", profilePicture, profilePicture.name);
      // let modelKeys = Object.keys(model);
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
