import {Injectable} from '@angular/core';
import {AppRestService} from "./app-rest.service";

@Injectable({
  providedIn: 'root'
})
export class PayrollTypeService {
  private apiUrl: string = 'api/payroll-type/';

  constructor(private httpService: AppRestService) {
  }

  public getAllPayrollTypes() {
    return new Promise((resolve, reject) => {
      this.httpService.doGet(this.apiUrl).subscribe(success => resolve(success), error => reject(error));
    });
  }
}
