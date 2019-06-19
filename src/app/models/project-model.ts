import {TaskModel} from "./task-model";

export class ProjectModel {
  ProjectGuid: string;
  EmployeeGuid: string;
  Project: string;
  Tasks: Array<TaskModel>;
  autoCompleteDataList: Array<any>;

  Guid: string;
  Number: string;
  Description: string;
  StatusGuid: string;
  TagGuid: string;
  IncludeInMasterBCT: boolean;
  ServiceReportRequired: boolean;
  CustomerContactGuid: string;
  CustomerProjectManagerGuid: string;
  ProjectManagerGuid: string;
  TeamLeadGuid: string;
  TypeGuid: string;
  PurchaseOrderNumber: string;
  DefaultBudgetView: string;
  TaxRate: null;
  FacilityName: string;
  WorkOrderNumber: number;
  ShortDescription: string;
  WorkOrderContact: string;
  CreatedDate: string;
  QBCustomerId: string;
  ShowLegalNameToInvoice: boolean;
  CurrencyGuid: string;
  CustomerContact_Guid: string;
  CustomerContact_Guid1: string;
  Tax1Rate: number;
  Tax1Label: string;
  Tax1Enabled: boolean;
  Tax2Rate: number;
  Tax2Label: string;
  Tax2Enabled: boolean;
  CustomerGuid: string;
  IndustryGuid: string;
  ScopeGuid: string;
  OTMultiplier: number;
  DTMultiplier: number;
  SortOrder: number;

  constructor() {
  }

}
