export class TimesheetModel {
  // Guid: string;
  ProjectGuid: string;
  ProjectRoleGuid: string;
  ProjectRole: string;
  FeatureGuid: string;
  EmployeeGuid: string;
  timesheet_guid: string;
  Date: string;
  RegularHr: number;
  OTHr: number;
  BOTHr: number;
  DTHr: number;
  SRNotes: string;
  IsApproved: boolean;
  ApprovedByGuid: string;
  ApprovedDate: string;
  IsLocked: boolean;
  logsArray: Array<any>;
  autoCompleteDataList: Array<any>;
  summeryRowTotal: number;
  isEntrySaved: boolean;

  constructor(values?: Object | null) {
    if (values) {
      this.ProjectGuid = values['ProjectGuid'] ? values['ProjectGuid'] : '';
      this.FeatureGuid = values['FeatureGuid'] ? values['FeatureGuid'] : '';
      this.EmployeeGuid = values['EmployeeGuid'] ? values['EmployeeGuid'] : '';
      this.timesheet_guid = values['timesheet_guid'] ? values['timesheet_guid'] : '';
      this.Date = values['Date'] ? values['Date'] : '';
      this.RegularHr = values['RegularHr'] ? values['RegularHr'] : null;
      this.OTHr = values['OTHr'] ? values['OTHr'] : null;
      this.BOTHr = values['BOTHr'] ? values['BOTHr'] : null;
      this.DTHr = values['DTHr'] ? values['DTHr'] : null;
      this.SRNotes = values['SRNotes'] ? values['SRNotes'] : '';
      this.IsApproved = values['IsApproved'] ? values['IsApproved'] : null;
      this.ApprovedByGuid = values['ApprovedByGuid'] ? values['ApprovedByGuid'] : null;
      this.ApprovedDate = values['ApprovedDate'] ? values['ApprovedDate'] : null;
      this.IsLocked = values['IsLocked'] ? values['IsLocked'] : null;
      this.logsArray = values['logsArray'] ? values['logsArray'] : null;
      this.autoCompleteDataList = values['autoCompleteDataList'] ? values['autoCompleteDataList'] : null;
      this.summeryRowTotal = values['summeryRowTotal'] ? values['summeryRowTotal'] : 0;
      this.isEntrySaved = values['isEntrySaved'] ? values['isEntrySaved'] : false;
    }
  }


  /* get projectGuid(): string {
     return this._projectGuid;
   }

   set projectGuid(value: string) {
     this._projectGuid = value;
   }

   get featureGuid(): string {
     return this._featureGuid;
   }

   set featureGuid(value: string) {
     this._featureGuid = value;
   }

   get employeeGuid(): string {
     return this._employeeGuid;
   }

   set employeeGuid(value: string) {
     this._employeeGuid = value;
   }

   get timesheet_guid(): string {
     return this._Guid;
   }

   set timesheet_guid(value: string) {
     this._Guid = value;
   }

   get date(): string {
     return this._date;
   }

   set date(value: string) {
     this._date = value;
   }

   get regularHr(): number {
     return this._regularHr;
   }

   set regularHr(value: number) {
     this._regularHr = value;
   }

   get oTHr(): number {
     return this._oTHr;
   }

   set oTHr(value: number) {
     this._oTHr = value;
   }

   get bOTHr(): number {
     return this._bOTHr;
   }

   set bOTHr(value: number) {
     this._bOTHr = value;
   }

   get dTHr(): number {
     return this._dTHr;
   }

   set dTHr(value: number) {
     this._dTHr = value;
   }

   get sRNotes(): string {
     return this._sRNotes;
   }

   set sRNotes(value: string) {
     this._sRNotes = value;
   }*/
}
