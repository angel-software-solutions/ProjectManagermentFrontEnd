import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectModel} from "../../models/project-model";
import {ProjectExpenseHelperService} from "../../services/project-expense-helper.service";
import {PayrollTypeService} from "../../services/payroll-type.service";
import {ScopeService} from "../../services/scope.service";
import {HandleHttpErrorsService} from "../../services/handle-http-errors.service";

@Component({
  selector: 'app-project-expense',
  templateUrl: './project-expense.component.html',
  styleUrls: ['./project-expense.component.sass']
})
export class ProjectExpenseComponent implements OnInit, OnDestroy {
  private currentProjectGuid: string;
  private readonly routerParamsSubscription;
  public currentProject: ProjectModel;
  isAllRowsExpanded: boolean = true;
  private tableColumns: Array<any>;
  private payrollTypes: Array<any>;
  private scopeLists: Array<any>;
  expenseRows: Array<any>;
  public currentProjectExpense: Array<any>;
  isGridOptionsVisible: boolean = false;
  @ViewChild('dropdownButtonRef') dropdownButtonRef: ElementRef;
  isNewRowAdded: boolean;
  tempNewRow: any = {data: {}, children: []};

  constructor(private projectExpenseService: ProjectExpenseHelperService,
              private payrollTypeService: PayrollTypeService,
              private scopeService: ScopeService,
              private handleHttpErrorService: HandleHttpErrorsService,
              private activateRoute: ActivatedRoute) {
    this.routerParamsSubscription = this.activateRoute.params.subscribe(params => {
      this.currentProjectGuid = params['guid'];
      this.getProjectDetailsByGuid();
    });
    this.tableColumns = [
      {field: 'description', header: 'Description', width: 280, type: 'text', displayType: 'text'},
      {field: 'scopeName', header: 'Scope', width: 100, type: 'dropdown', displayType: 'text'},
      {field: 'payrollType', header: 'Payroll Type', width: 100, type: 'dropdown', displayType: 'text'},
      {field: 'status', header: 'Custom Tags', width: 100, type: 'text', displayType: 'text'},
    ];
    this.getAllPayrollTypes(this.tableColumns[2]);
    this.getAllScopes(this.tableColumns[1]);
  }

  ngOnInit() {
  }

  private collapseExpandAll(items, isExpanded: boolean) {
    for (let index = 0; index < (items || []).length; index++) {
      items[index].expanded = isExpanded;
      if ((items[index].children || []).length > 0)
        this.collapseExpandAll(items[index].children, isExpanded);
    }
    return items;
  }

  private getAllPayrollTypes(itemObject) {
    this.payrollTypeService.getAllPayrollTypes().then((success: any) => {
      this.payrollTypes = [...success];
      if (!itemObject['dataListItems']) itemObject['dataListItems'] = [];
      itemObject['dataListItems'] = [...success];
    }, error => this.handleHttpErrorService.handleHttpError(error));
  }

  private getAllScopes(itemObject) {
    this.scopeService.getAllScopes().then((success: any) => {
      this.scopeLists = [...success];
      if (!itemObject['dataListItems']) itemObject['dataListItems'] = [];
      itemObject['dataListItems'] = [...success];
    }, error => this.handleHttpErrorService.handleHttpError(error));
  }

  private getProjectDetailsByGuid() {
    if (this.currentProjectGuid && this.currentProjectGuid.length > 0) {
      this.projectExpenseService.getAllExpenseData(this.currentProjectGuid).then((expenseData: any) => {
        this.processDynamicColumns(expenseData.projectRoles);
        this.currentProject = expenseData.projectModel;
        this.currentProjectExpense = [...this.collapseExpandAll(expenseData.expenseRows, true)];
        console.info('currentProjectExpense ', this.currentProjectExpense);
      }, error => this.handleHttpErrorService.handleHttpError(error));
    }
  }

  private processDynamicColumns(projectRoles: Array<any>) {
    let projectRolesAsColumns = [];
    projectRoles.forEach(roleItem => {
      projectRolesAsColumns.push({field: roleItem.roleGuid, header: roleItem.description, width: 70, secondaryField: roleItem.roleRate, type: 'input', displayType: 'number'});
    });
    projectRolesAsColumns.push({field: 'totalHours', header: 'Total Hours', width: 80, type: 'text', displayType: 'number'});
    projectRolesAsColumns.push({field: 'rowCost', header: 'Cost ($)', width: 80, type: 'currency', displayType: 'currency'});
    /*projectRolesAsColumns.push(
      {field: 'statusClosingDate', header: 'Status Closing Date', width: 100, type: 'text'},
      {field: 'facilityName', header: 'Facility', width: 100, type: 'text'}
    );*/

    this.tableColumns = [...this.tableColumns, ...projectRolesAsColumns];
    console.info('this.tableColumns ', this.tableColumns);
  }

  ngOnDestroy(): void {
    if (this.routerParamsSubscription) {
      this.routerParamsSubscription.unsubscribe();
    }
  }

  toggleRows() {
    this.isAllRowsExpanded = !this.isAllRowsExpanded;
    this.currentProjectExpense = [...this.collapseExpandAll(this.currentProjectExpense, this.isAllRowsExpanded)];
  }

  consoleItems(rowData, col: any) {
    console.info('consoleItems', col, rowData);

  }

  onInputBlurEventListener(rowData, col: any) {
    console.info('onInputBlurEventListener', col, rowData);
    if (rowData.allocation) {
      let keys = Object.keys(rowData.allocation);
      if ((keys || []).length > 0) {
        (keys || []).forEach(keyItem => {
          let saveModel: any = {};
          saveModel.taskGuid = rowData.guid;
          saveModel.allocatedHours = rowData.allocation[keyItem];
          saveModel.allocatedForGuid = col.field;
          console.info('Save Allocation For', saveModel);
        });
      }
    }
  }

  onTableRowEditCompleteEventListener(event: any) {
    console.info('onTableRowEditCompleteEventListener', event);
  }

  onTableRowEditInitEventListener(event: any) {
    console.info('onTableRowEditInitEventListener', event);
  }

  onTableRowEditCancelEventListener(event: any) {
    console.info('onTableRowEditCancelEventListener', event);
  }

  onRowClicked(rowNode) {
    console.info('onRowClicked', rowNode);
  }

  toggleGridOptions() {
    this.isGridOptionsVisible = !this.isGridOptionsVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClicked(event: any) {
    // console.info('onDocumentClicked', event);
    if (!this.dropdownButtonRef.nativeElement.contains(event.target)) {
      this.isGridOptionsVisible = false;
    }
  }

  onAddEstimateButtonClicked(event: MouseEvent) {
    console.info('onAddEstimateButtonClicked', event);
    let newItem = {data: {}, children: []};
    Object.assign(newItem['data'], {description: '', scopeName: '', payrollType: '', status: ''});
    newItem.children.push({description: '', scopeName: '', payrollType: '', status: ''});
    newItem['isEmptyRow'] = true;
    // this.currentProjectExpense.push(newItem);
    // this.currentProjectExpense = [...this.currentProjectExpense];
    this.tempNewRow = newItem;
    this.isNewRowAdded = true;
  }

  onSaveButtonClicked(event: MouseEvent) {
    console.info('onSaveButtonClicked', this.tempNewRow);
  }
}
