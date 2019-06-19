import {Injectable} from '@angular/core';
import {AppRestService} from "./app-rest.service";
import {TimesheetModel} from "../models/timesheet-model";

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private timesheetAPIEndPoint: string = '/api/timesheet/';

  constructor(private appRestService: AppRestService) {
  }

  /*public tempGetStaticData() {
    return [
      {
        "EmployeeGuid": "E40466E2-94ED-4356-B2AA-0B7070433F62",
        "ProjectRoleGuid": null,
        "ProjectGuid": "870FBF71-D648-4756-B668-2D56B54F0CF3",
        "Project": "99997",
        "Tasks": [
          {
            "EmployeeGuid": "E40466E2-94ED-4356-B2AA-0B7070433F62",
            "FeatureGuid": "DCC1F5F0-3815-4935-8F3E-FE0424A893A6",
            "EmployeeRateGuid": null,
            "Employee": "Harry Houdini",
            "Task": "4.3 Software Commissioning",
            "logsEntries": [
              {
                "RegularHr": 1,
                "OTHr": null,
                "BOTHr": null,
                "DTHr": null,
                "IsApproved": false,
                "ApprovedByGuid": null,
                "ApprovedDate": null,
                "IsLocked": false,
                "SRNotes": null,
                "Date": "2019-06-03T04:00:00.000Z"
              }
            ]
          },
          {
            "EmployeeGuid": "E40466E2-94ED-4356-B2AA-0B7070433F62",
            "FeatureGuid": "98ABB6C1-A008-4F02-B4EE-118267392240",
            "EmployeeRateGuid": null,
            "Employee": "Harry Houdini",
            "Task": "Flow Meters",
            "logsEntries": [
              {
                "RegularHr": 2,
                "OTHr": null,
                "BOTHr": null,
                "DTHr": null,
                "IsApproved": false,
                "ApprovedByGuid": null,
                "ApprovedDate": null,
                "IsLocked": false,
                "SRNotes": null,
                "Date": "2019-06-03T04:00:00.000Z"
              }
            ]
          }
        ]
      },
      {
        "Employee": "Harry Houdini",
        "ProjectRoleGuid": null,
        "ProjectGuid": "438B86CD-5E2F-4AA9-888D-1FFFFFB6EBEC",
        "Project": "99994",
        "Tasks": [
          {
            "Employee": "Harry Houdini",
            "FeatureGuid": "186F7DF0-8E4C-47DA-8EED-B72F3D0BB9DE",
            "EmployeeGuid": "E40466E2-94ED-4356-B2AA-0B7070433F62",
            "EmployeeRateGuid": null,
            "Task": "4.1 Software Installation",
            "logsEntries": [
              {
                "RegularHr": 1,
                "OTHr": null,
                "BOTHr": null,
                "DTHr": null,
                "IsApproved": false,
                "ApprovedByGuid": null,
                "ApprovedDate": null,
                "IsLocked": false,
                "SRNotes": null,
                "Date": "2019-06-03T04:00:00.000Z"
              }, {
                "RegularHr": 2,
                "OTHr": null,
                "BOTHr": null,
                "DTHr": null,
                "IsApproved": false,
                "ApprovedByGuid": null,
                "ApprovedDate": null,
                "IsLocked": false,
                "SRNotes": null,
                "Date": "2019-06-06T04:00:00.000Z"
              }, {
                "RegularHr": 3,
                "OTHr": null,
                "BOTHr": null,
                "DTHr": null,
                "IsApproved": false,
                "ApprovedByGuid": null,
                "ApprovedDate": null,
                "IsLocked": false,
                "SRNotes": null,
                "Date": "2019-06-05T04:00:00.000Z"
              }
            ]
          },
          {
            "Employee": "Harry Houdini",
            "FeatureGuid": "D3A6C413-B9D9-43A4-807D-2F7075DF4FD5",
            "EmployeeGuid": "E40466E2-94ED-4356-B2AA-0B7070433F62",
            "EmployeeRateGuid": null,
            "Task": "4.2 Software Commissioning",
            "logsEntries": [
              {
                "RegularHr": 1,
                "OTHr": null,
                "BOTHr": null,
                "DTHr": null,
                "IsApproved": false,
                "ApprovedByGuid": null,
                "ApprovedDate": null,
                "IsLocked": false,
                "SRNotes": null,
                "Date": "2019-06-05T04:00:00.000Z"
              }
            ]
          },
          {
            "Employee": "Harry Houdini",
            "FeatureGuid": "98BFDC19-87BA-472E-8802-28BA68D45B7F",
            "EmployeeGuid": "E40466E2-94ED-4356-B2AA-0B7070433F62",
            "EmployeeRateGuid": null,
            "Task": "5.1 User Guide",
            "logsEntries": [
              {
                "RegularHr": 1,
                "OTHr": null,
                "BOTHr": null,
                "DTHr": null,
                "IsApproved": false,
                "ApprovedByGuid": null,
                "ApprovedDate": null,
                "IsLocked": false,
                "SRNotes": null,
                "Date": "2019-06-03T04:00:00.000Z"
              }
            ]
          }
        ]
      }
    ];
  }*/

  public getTimesheetData(queryParams: any) {
    return new Promise((onResolve, onReject) => {
      this.appRestService.doGet(this.timesheetAPIEndPoint + 'GetAllTimesheetByEmployee', queryParams).subscribe(success => {
        onResolve(success);
      }, error => {
        onReject(error);
      });
    });
  }

  public createTimesheetRow(model: TimesheetModel) {
    return new Promise((onResolve, onReject) => {
      this.appRestService.doPost(this.timesheetAPIEndPoint, model).subscribe(success => {
        onResolve(success);
      }, error => {
        onReject(error);
      });
    });
  }

  public updateTimesheetRow(model: TimesheetModel) {
    return new Promise((onResolve, onReject) => {
      this.appRestService.doPatch(this.timesheetAPIEndPoint, model).subscribe(success => {
        onResolve(success);
      }, error => {
        onReject(error);
      });
    })
  }

  deleteTimesheetEntry(guid: Array<string>) {
    return new Promise((onResolve, onReject) => {
      this.appRestService.delete(this.timesheetAPIEndPoint + '/' + guid.join(',')).subscribe(success => {
        onResolve(success);
      }, error => {
        onReject(error);
      });
    });
  }
}
