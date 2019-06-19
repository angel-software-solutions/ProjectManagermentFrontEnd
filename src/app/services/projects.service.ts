import {Injectable} from '@angular/core';
import {ProjectModel} from "../models/project-model";
import {AppRestService} from "./app-rest.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl: string = 'api/project/';

  constructor(private httpService: AppRestService) {
  }

  public getProjectByGuid(projectGuid: string): Promise<ProjectModel> {
    return new Promise((onRequestAccepted, onRequestRejected) => {
      this.httpService.doGet(this.apiUrl + 'get-project/' + projectGuid).subscribe(project => {
        let projectModel = new ProjectModel();
        Object.assign(projectModel, project);
        onRequestAccepted(projectModel);
      }, error => {
        onRequestRejected(null);
      })
    });
  }
}
