import { Injectable } from "@angular/core";
import { AppRestService } from "./app-rest.service";
import { Geography } from "../models/geography.model";
import { TreeviewItem } from "ngx-treeview";

@Injectable({
  providedIn: "root"
})
export class GeographyService {
  private apiUrl: string = "api/geography/";
  constructor(private httpService: AppRestService) {}

  getGeographiesTreeView(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.doGet(this.apiUrl).subscribe(
        geographies => {
          resolve(geographies);
        },
        error => {
          reject(error);
        }
      );
    });
  }
}
