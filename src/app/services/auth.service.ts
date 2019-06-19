import {Injectable} from '@angular/core';
import {AppRestService} from "./app-rest.service";
import {LoginModel} from "../models/login-model";
import {LocalStorageService} from "./local-storage.service";
import {UserAuthModel} from "../models/user-auth-model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = "api/auth/login";


  constructor(private appRestService: AppRestService,
              private localStorageService: LocalStorageService) {
  }

  doLogin(credentials: LoginModel) {
    return new Promise((onFulfilled, onRejected) => {
      this.appRestService.doPost(this.api, credentials).subscribe((success: any) => {
        onFulfilled(success);
      }, (error) => {
        onRejected(error);
      });
    });
  }

  isUserAuthenticated() {
    return this.localStorageService.getAuthenticationToken() != null;
  }


}
