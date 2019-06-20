import { Injectable } from "@angular/core";
import { AppRestService } from "./app-rest.service";
import { CustomerModel } from "../models/customer-model";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private apiUrl: string = "api/customer/";
  constructor(private httpService: AppRestService) {}

  public getAllCustomers(): Promise<Array<CustomerModel>> {
    return new Promise((resolve, reject) => {
      this.httpService.doGet(this.apiUrl).subscribe(
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
}
