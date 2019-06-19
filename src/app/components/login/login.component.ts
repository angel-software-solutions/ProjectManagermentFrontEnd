import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {LoginModel} from "../../models/login-model";
import {Router} from '@angular/router';
import {LocalStorageService} from "../../services/local-storage.service";
import {UserAuthModel} from "../../models/user-auth-model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public loginModel: LoginModel = new LoginModel('', '');
  public isLoggingInProgress: boolean = false;
  public ifLoginError: boolean = false;

  constructor(private loginService: LoginService,
              private localStorage: LocalStorageService,
              private router: Router) {
  }

  ngOnInit() {
  }

  public onFormSubmitted() {
    if (this.isLoggingInProgress) return;
    this.isLoggingInProgress = true;
    this.loginService.doLogin(this.loginModel).then((success: UserAuthModel) => {
      this.localStorage.setUserModel(success);
      this.isLoggingInProgress = false;
      this.router.navigate(['/', 'timesheet']);
    }, error => {
      this.ifLoginError = true;
      this.isLoggingInProgress = false;
    })
  }

  public onLoginErrorHide() {
    this.ifLoginError = false;
  }
}
