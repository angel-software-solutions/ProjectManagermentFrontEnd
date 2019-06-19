import {Injectable} from '@angular/core';
import {LoginModel} from "../models/login-model";
import {AuthService} from "./auth.service";
import {UserAuthModel} from "../models/user-auth-model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authService: AuthService) {
  }

  public doLogin(credentials: LoginModel) {
    return new Promise((onFulFilled, onRejected) => {
      if (credentials.getUserName() != null && credentials.getPassword() != null) {
        this.authService.doLogin(credentials).then((success: UserAuthModel) => {
          console.info(success);
          onFulFilled(success);
        }, (error) => {
          console.error(error);
          onRejected(error);
        });
      } else {
        onRejected({error: 'Invalid Credentials'});
      }
    });

  }
}
