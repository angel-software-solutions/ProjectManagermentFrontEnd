import { Injectable } from "@angular/core";
import { AppRestService } from "./app-rest.service";
import { Currency } from "../models/currency.model";

@Injectable({
  providedIn: "root"
})
export class CurrencyService {
  private apiUrl: string = "api/currency/";
  constructor(private httpService: AppRestService) {}

  public getCurrencyForDropDown(): Promise<Array<Currency>> {
    return new Promise((onRequestAccepted, onRequestRejected) => {
      this.httpService.doGet(this.apiUrl).subscribe(
        currencies => {
          let _currencies = new Array<Currency>();
          Object.assign(_currencies, currencies);
          let defaultCurrency = new Currency();
          defaultCurrency.Name = "--Select--";
          _currencies = [...[defaultCurrency], ..._currencies];

          onRequestAccepted(_currencies);
        },
        error => {
          onRequestRejected(null);
        }
      );
    });
  }
}
