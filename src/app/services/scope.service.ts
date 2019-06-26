import { Injectable } from "@angular/core";
import { AppRestService } from "./app-rest.service";
import { Scope } from "../models/scope.model";

@Injectable({
  providedIn: "root"
})
export class ScopeService {
  private apiUrl: string = "api/scope/";
  constructor(private httpService: AppRestService) {}

  public getScopesForDropDown(): Promise<Array<Scope>> {
    return new Promise((onRequestAccepted, onRequestRejected) => {
      this.httpService.doGet(this.apiUrl).subscribe(
        scopes => {
          let _scopes = new Array<Scope>();
          Object.assign(_scopes, scopes);
          let defaultScope = new Scope();
          defaultScope.Name = "--Select--";
          _scopes = [...[defaultScope], ..._scopes];

          onRequestAccepted(_scopes);
        },
        error => {
          onRequestRejected(null);
        }
      );
    });
  }
}
