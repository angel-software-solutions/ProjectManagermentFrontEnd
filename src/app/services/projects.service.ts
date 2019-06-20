import { Injectable } from "@angular/core";
import { ProjectModel } from "../models/project-model";
import { AppRestService } from "./app-rest.service";
import { ProjectType } from "../models/projecttype";
import { Projectstatus } from "../models/projectstatus";

@Injectable({
  providedIn: "root"
})
export class ProjectsService {
  private apiUrl: string = "api/project/";

  constructor(private httpService: AppRestService) {}

  public getProjectByGuid(projectGuid: string): Promise<ProjectModel> {
    return new Promise((onRequestAccepted, onRequestRejected) => {
      this.httpService
        .doGet(this.apiUrl + "get-project/" + projectGuid)
        .subscribe(
          project => {
            let projectModel = new ProjectModel();
            Object.assign(projectModel, project);
            onRequestAccepted(projectModel);
          },
          error => {
            onRequestRejected(null);
          }
        );
    });
  }

  public getProjectTypes(): Promise<Array<ProjectType>> {
    return new Promise((onRequestAccepted, onRequestRejected) => {
      this.httpService.doGet(this.apiUrl + "GetAllProjectTypes").subscribe(
        pts => {
          let ptsm = new Array<ProjectType>();
          Object.assign(ptsm, pts);
          onRequestAccepted(ptsm);
        },
        error => {
          onRequestRejected(null);
        }
      );
    });
  }

  public getProjectStatuses(): Promise<Array<Projectstatus>> {
    return new Promise((onRequestAccepted, onRequestRejected) => {
      this.httpService.doGet(this.apiUrl + "GetAllProjectStatuses").subscribe(
        pses => {
          let _pses = new Array<Projectstatus>();
          Object.assign(_pses, pses);
          onRequestAccepted(_pses);
        },
        error => {
          onRequestRejected(null);
        }
      );
    });
  }
}
