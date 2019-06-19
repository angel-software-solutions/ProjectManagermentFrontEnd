import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from "./local-storage.service";
import {environment} from "../../environments/environment";

export function applicationHttpClientCreator(http: HttpClient) {
  // @ts-ignore
  return new AppRestService(http);
}

@Injectable({
  providedIn: 'root'
})
export class AppRestService {
  private apiUrl: string = (environment.appInitialURL);

  constructor(private httpService: HttpClient,
              private storageService: LocalStorageService) {
  }

  public doGet(endPoint: string, options?: any) {
    return this.httpService.get(this.updateURLForParams(this.apiUrl + endPoint, options), this.getUpdatedOptions(endPoint, options));
  }

  public doPost(endPoint: string, body: Object, options?: any) {
    return this.httpService.post(this.apiUrl + endPoint, body, this.getUpdatedOptions(endPoint, options));
  }

  public doPatch(endPoint: string, body: Object, options?: any) {
    return this.httpService.patch(this.apiUrl + endPoint, body, this.getUpdatedOptions(endPoint, options));
  }

  public doPut(endPoint: string, body: Object, options?: any) {
    return this.httpService.put(this.apiUrl + endPoint, body, this.getUpdatedOptions(endPoint, options));
  }

  public delete(endPoint: string, options?: any) {
    return this.httpService.delete(this.updateURLForParams(this.apiUrl + endPoint, options), this.getUpdatedOptions(endPoint, options));
  }


  private updateURLForParams(endPoint: string, params: Object): string {
    if (!params) return endPoint;
    let paramKeys = Object.keys(params);
    endPoint += '?';
    for (let index = 0; index < paramKeys.length; index++) {
      endPoint += paramKeys[index] + "=" + params[paramKeys[index]] + "&";
    }
    endPoint = endPoint.substr(0, endPoint.length - 1);
    return endPoint;
  }

  private getUpdatedOptions(endPoint: string, options?: any) {
    if (endPoint.indexOf('auth') > -1)
      return options;
    let headers = new HttpHeaders().set('auth', this.storageService.getAuthenticationToken());
    if (!options)
      options = {};
    options['headers'] = headers;
    return options;
  }

  /*private getRequestHeaders() {
    if (this.authService.isUserAuthenticated()) {
      return {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'auth': ''})
      };
    } else {
      return {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };

    }
  }*/
}
