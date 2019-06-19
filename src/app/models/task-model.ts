import {TimesheetModel} from "./timesheet-model";

export class TaskModel {

  Task: string;
  Employee: string;
  EmployeeGuid: string;
  FeatureGuid: string;
  EmployeeRateGuid: string;
  EmployeeRate: number;
  Timesheets: Array<TimesheetModel>;
  isNewTask: boolean;
  autoCompleteDataList: Array<any>;
  ProjectRoleGuid: string;

  constructor(values: Object = null) {
    if (values) {
      this.Task = values['Task'] ? values['Task'] : null;
      this.Employee = values['Employee'] ? values['Employee'] : null;
      this.EmployeeGuid = values['EmployeeGuid'] ? values['EmployeeGuid'] : null;
      this.FeatureGuid = values['FeatureGuid'] ? values['FeatureGuid'] : null;
      this.EmployeeRateGuid = values['EmployeeRateGuid'] ? values['EmployeeRateGuid'] : null;
      this.EmployeeRate = values['EmployeeRate'] ? values['EmployeeRate'] : null;
      this.Timesheets = values['Timesheets'] ? values['Timesheets'] : null;
      this.isNewTask = values['isNewTask'] ? values['isNewTask'] : null;
      this.autoCompleteDataList = values['autoCompleteDataList'] ? values['autoCompleteDataList'] : null;
      this.ProjectRoleGuid = values['ProjectRoleGuid'] ? values['ProjectRoleGuid'] : null;
    }
  }

}
