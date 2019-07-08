import {Injectable} from '@angular/core';
import {AppRestService} from "./app-rest.service";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl: string = 'api/group/';

  constructor(private httpService: AppRestService) {
  }

  public getAllGroups() {
    return new Promise((onResolved, onRejected) => {
      this.httpService.doGet(this.apiUrl).subscribe(response => onResolved(response), error => onRejected(error));
    });
  }
}
