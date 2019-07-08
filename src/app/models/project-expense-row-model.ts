export class ProjectExpenseRowModel {
  Guid: string;
  description: string;
  type: string;
  scopeName: string;
  payrollType: string;
  childTasks: Array<any>;

  constructor(values: Object = {}) {
    this.Guid = values['Guid'] ? values['Guid'] : null;
    this.description = values['description'] ? values['description'] : null;
    this.type = values['type'] ? values['type'] : null;
    this.scopeName = values['scopeName'] ? values['scopeName'] : null;
    this.payrollType = values['payrollType'] ? values['payrollType'] : null;
    this.childTasks = values['childTasks'] ? values['childTasks'] : [];
  }
}

export class ProjectExpenseAllocationModel {
  projectRoleGuid: string;
  estimateHours: number;
  type: string;
  roleRate: number;

  constructor(values: Object = {}) {
    this.projectRoleGuid = values['projectRoleGuid'] ? values['projectRoleGuid'] : null;
    this.estimateHours = values['estimateHours'] ? values['estimateHours'] : null;
    this.type = values['type'] ? values['type'] : null;
    this.roleRate = values['roleRate'] ? values['roleRate'] : null;
  }
}
