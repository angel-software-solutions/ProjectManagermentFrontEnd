import { Injectable } from "@angular/core";
import { AppRestService } from "./app-rest.service";
import { ProjectTag } from "../models/project-tag.model";

@Injectable({
  providedIn: "root"
})
export class ProjecttagService {
  private apiUrl: string = "api/projecttag/";
  constructor(private httpService: AppRestService) {}

  getAllProjectTagByProject(projectGuid): Promise<Array<ProjectTag>> {
    return new Promise((resolve, reject) => {
      this.httpService.doGet(this.apiUrl + projectGuid).subscribe(
        projecttags => {
          let _projecttags = new Array<ProjectTag>();
          Object.assign(_projecttags, projecttags);
          resolve(_projecttags);
        },
        error => {
          reject(error);
        }
      );
    });
  }
}
