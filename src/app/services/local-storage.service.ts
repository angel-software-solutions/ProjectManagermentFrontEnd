import {Injectable} from '@angular/core';
import {UserAuthModel} from "../models/user-auth-model";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private AUTHENTICATION_TOKEN_KEY: string = "AUTHENTICATION_TOKEN";
  private USER: string = "USER";

  constructor() {
  }

  public setAuthenticationToken(value: any) {
    localStorage.setItem(this.AUTHENTICATION_TOKEN_KEY, value);
  }

  public getAuthenticationToken() {
    return localStorage.getItem(this.AUTHENTICATION_TOKEN_KEY);
  }

  public setUserModel(userModel: UserAuthModel) {
    this.setAuthenticationToken(userModel.authToken);
    localStorage.setItem(this.USER, JSON.stringify(userModel));
  }

  public getUserModel(): UserAuthModel {
    return JSON.parse(localStorage.getItem(this.USER));
  }


  clearAll() {
    localStorage.clear();
  }
}
