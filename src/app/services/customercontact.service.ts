import { Injectable } from "@angular/core";
import { AppRestService } from "./app-rest.service";
import { CustomerContact } from "../models/customer-contact.model";

@Injectable({
  providedIn: "root"
})
export class CustomercontactService {
  private apiUrl: string = "api/customer-contact/";

  constructor(private httpService: AppRestService) {}

  public getCustomerContacts(
    customerGuid: string
  ): Promise<Array<CustomerContact>> {
    return new Promise((onRequestAccepted, onRequestRejected) => {
      this.httpService.doGet(this.apiUrl + customerGuid).subscribe(
        ccontacts => {
          let customercontacts = new Array<CustomerContact>();
          Object.assign(customercontacts, ccontacts);
          onRequestAccepted(customercontacts);
        },
        error => {
          onRequestRejected(null);
        }
      );
    });
  }

  public getCustomerContactsForDropDown(
    customerGuid: string
  ): Promise<Array<CustomerContact>> {
    return new Promise((onRequestAccepted, onRequestRejected) => {
      this.httpService.doGet(this.apiUrl + customerGuid).subscribe(
        ccontacts => {
          let customercontacts = new Array<CustomerContact>();
          Object.assign(customercontacts, ccontacts);
          let defaulSelectCustomerC = new CustomerContact();
          defaulSelectCustomerC.FullName = "--Select--";
          customercontacts = [...[defaulSelectCustomerC], ...customercontacts];
          customercontacts.forEach(element => {
            if (element.FirstName && element.LastName)
              element.FullName = element.FirstName + " " + element.LastName;
          });
          onRequestAccepted(customercontacts);
        },
        error => {
          onRequestRejected(null);
        }
      );
    });
  }
}
