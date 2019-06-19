import {Injectable} from '@angular/core';
import {AppRestService} from "./app-rest.service";

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {
  private static appRestService: AppRestService;

  constructor(private appRestService: AppRestService) {
    AutoCompleteService.appRestService = this.appRestService;
  }

  public projectSearchAutoCompleteCall(searchQuery: string, filterOptions?: any) {
    return new Promise((onFulfilled, onRejected) => {
      AutoCompleteService.searchAPIGetCall("api/project/autocomplete", filterOptions).subscribe(success => onFulfilled(success), error => onRejected(error));
    });
  }

  public taskSearchAutoCompleteCall(searchQuery: string, filterOptions?: any) {
    return new Promise((onFulfilled, onRejected) => {
      AutoCompleteService.searchAPIGetCall("api/task/autocomplete", filterOptions).subscribe(success => onFulfilled(success), error => onRejected(error));
    });
  }

  public projectRoleSearchAutoCompleteCall(searchQuery: string, filterOptions?: any) {
    return new Promise((onFulfilled, onRejected) => {
      AutoCompleteService.searchAPIGetCall("api/timesheet/GetAllProjectRolesByProject", filterOptions).subscribe(success => onFulfilled(success), error => onRejected(error));
    });
  }

  private static searchAPIGetCall(endpoint: string, searchQuery: string) {
    return AutoCompleteService.appRestService.doGet(endpoint, searchQuery);
  }

  /*private static searchAPIPostCall(endpoint: string, reqBody: any) {
    return AutoCompleteService.appRestService.doPost(endpoint, reqBody);
  }*/
}
