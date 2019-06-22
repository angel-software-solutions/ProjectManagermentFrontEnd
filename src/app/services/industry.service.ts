import { Injectable } from "@angular/core";
import { AppRestService } from "./app-rest.service";
import { Industry } from "../models/industry.model";

@Injectable({
  providedIn: "root"
})
export class IndustryService {
  private apiUrl: string = "api/industry/";
  constructor(private httpService: AppRestService) {}

  public getIndustriesForDropDown(): Promise<Array<Industry>> {
    return new Promise((onRequestAccepted, onRequestRejected) => {
      this.httpService.doGet(this.apiUrl).subscribe(
        industries => {
          let _industries = new Array<Industry>();
          Object.assign(_industries, industries);
          let defaultIndustry = new Industry();
          defaultIndustry.Name = "--Select--";
          _industries = [...[defaultIndustry], ..._industries];

          onRequestAccepted(_industries);
        },
        error => {
          onRequestRejected(null);
        }
      );
    });
  }
}
