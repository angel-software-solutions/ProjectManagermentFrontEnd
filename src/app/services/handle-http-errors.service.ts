import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from "./local-storage.service";
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorsService {

  constructor(private storageService: LocalStorageService,
              private router: Router,
              private toasterService: ToastrService) {
  }

  public handleHttpError(error: any) {
    if (error.status) {
      if (error.status == 504) {
        this.toasterService.error('Not able to connect to Server, please try again later.', 'Server Not available');
        this.clearAllAndLogoutUser()
      } else if (error.status == 401) {
        this.clearAllAndLogoutUser()
      } else if (error.status == 404) {
        this.router.navigate(['page-not-found']);
      }
    }
  }

  private clearAllAndLogoutUser() {
    this.storageService.clearAll();
    this.router.navigate(['login']);
  }
}

