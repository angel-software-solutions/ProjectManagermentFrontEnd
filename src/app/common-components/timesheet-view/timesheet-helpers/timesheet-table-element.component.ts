import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef, NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment/moment';
import {TimesheetModel} from "../../../models/timesheet-model";
import {AutoCompleteService} from "../../../services/auto-complete.service";
import {ProjectModel} from "../../../models/project-model";
import {TaskModel} from "../../../models/task-model";
import {ConfirmModalDialogComponent} from "../../modals/confirm-modal-dialog/confirm-modal-dialog.component";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-table-view',
  templateUrl: './timesheet-table-element.component.html',
  styleUrls: ['./timesheet-table-element.component.sass']
})
export class TableElementComponent implements OnInit, OnChanges {
  @Input('columns') tableColumns;
  @Input('rows') tableRows;
  @Input('displayData') timesheetData;
  @Input('tableHeaders') tableHeaders;
  @Input('date-header-index') tableHeaderStartingLoopIndex: number;
  @Input('table-summary-row') summaryRow: TaskModel;

  @Output() updateTimesheetRow = new EventEmitter();
  @Output() deleteTimesheetEntry = new EventEmitter();

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  public selectedRow: ProjectModel = new ProjectModel();
  public selectedTask: TaskModel = new TaskModel();
  public selectedEntry: TimesheetModel = new TimesheetModel(null);
  private canFireEvent: boolean = false;
  public addedRow: TimesheetModel = new TimesheetModel(null);
  public isNewRowAdded: boolean;
  public ckEditorToolbarConfig: any;
  public projectRoleAutoCompleteData: Array<any> = [];

  public newProject: ProjectModel = new ProjectModel();
  public newTask: TaskModel = new TaskModel();

  private modalRef: any;
  private selectedAutoCompleteProject: any;

  constructor(private modalService: NgbModal,
              tooltipConfig: NgbTooltipConfig,
              private autoCompleteService: AutoCompleteService,
              private storageService: LocalStorageService) {
    tooltipConfig.placement = 'top';
    tooltipConfig.triggers = 'hover';
    this.ckEditorToolbarConfig = {
      toolbar: [[
        'Undo', 'Redo', '-',
        'Cut', 'Copy', 'Paste', '-',
        'Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting', '-',
        'Format', 'Font', 'FontSize', '-',
        'TextColor', 'BGColor', '-',
        'NumberedList', 'BulletedList', '-',
        'Outdent', 'Indent', '-', 'Blockquote',
        'Print'
      ]]
    };
  }

  ngOnInit(): void {
    this.initializeNewAndSummaryRows();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableHeaders'] != undefined) {
      this.initializeNewAndSummaryRows();
    }
  }

  private initializeNewAndSummaryRows() {
    this.newProject = new ProjectModel();
    this.selectedAutoCompleteProject = null;
    this.newTask = new TaskModel();
    this.newTask.isNewTask = true;
    this.newTask.Timesheets = [];
    this.summaryRow.Timesheets = [];
    for (let index = this.tableHeaderStartingLoopIndex; index < this.tableHeaders.length; index++) {
      let tableHeader = this.tableHeaders[index];
      let timesheetModel: TimesheetModel = new TimesheetModel({
        EmployeeGuid: this.storageService.getUserModel().employeeGuid,
        Date: tableHeader.displayLabel,
        ProjectRole: undefined, ProjectRoleGuid: undefined,
        timesheet_guid: undefined,
        autoCompleteDataList: null,
        logsArray: null,
        RegularHr: null,
        OTHr: null,
        BOTHr: null,
        DTHr: null,
        IsApproved: false,
        ApprovedByGuid: null,
        ApprovedDate: null,
        IsLocked: false,
        SRNotes: null,
        FeatureGuid: null,
        ProjectGuid: null,
      });
      this.newTask.Timesheets.push(Object.assign({}, timesheetModel));
      this.summaryRow.Timesheets.push(Object.assign({}, timesheetModel));
    }
  }

  getDisplayDate(displayLabel: any) {
    return moment(displayLabel).format("Do");
    // return moment(displayLabel).format("Do MMM");
  }

  getDisplayDayName(displayLabel: any) {
    return moment(displayLabel).format("ddd");
  }

  isWeekend(displayLabel: any) {
    if (moment(displayLabel, moment.ISO_8601).isValid()) {
      let momentObj = moment(displayLabel);
      let day = momentObj.format('dddd');
      return day === 'Sunday' || day === 'Saturday';
    }
  }

  isValidDate(date: any) {
    if (typeof date === "string") {
      return moment(date).isValid();
    } else
      return moment(date).isValid();
  }

  isToday(displayLabel: any) {
    if (moment(displayLabel, moment.ISO_8601).isValid()) {
      return moment().isSame(moment(displayLabel), 'year') && moment().isSame(moment(displayLabel), 'month') && moment().isSame(moment(displayLabel), 'day');
    }
  }

  isDateSame(firstDate: string, secondDate: string): boolean {
    let firstDateMoment = moment(firstDate), secondDateMoment = moment(secondDate);
    return firstDateMoment.isSame(secondDateMoment, 'year') && firstDateMoment.isSame(secondDateMoment, 'month') && firstDateMoment.isSame(secondDateMoment, 'day');
  }

  showEditModal(project: any, task: any, entry: any) {
    this.selectedRow = Object.assign({}, project);
    this.selectedTask = Object.assign({}, task);
    this.selectedEntry = Object.assign({}, entry);
    // this.selectedEntry.SRNotes = 'This is sample copmment to check binfdin';
    this.modalRef = this.modalService.open(this.modalContent, {size: 'lg'});
  }

  onModalSaveButtonClick(event: Event) {
    this.canFireEvent = true;
    this.selectedEntry.ProjectRoleGuid = this.selectedTask.ProjectRoleGuid;
    this.selectedEntry.FeatureGuid = this.selectedTask.FeatureGuid;
    this.selectedEntry.ProjectGuid = this.selectedTask['ProjectGuid'];

    this.updateTimesheetByGroup(event, this.selectedRow, this.selectedTask, TableElementComponent.getTimesheetEntry(this.selectedEntry));
    this.modalService.dismissAll();
  }

  private static getTimesheetEntry(timesheetEntry) {
    if (isNaN(timesheetEntry.RegularHr)) timesheetEntry.RegularHr = null; else timesheetEntry.RegularHr = parseFloat(timesheetEntry.RegularHr);
    if (isNaN(timesheetEntry.OTHr)) timesheetEntry.OTHr = null; else timesheetEntry.OTHr = parseFloat(timesheetEntry.OTHr);
    if (isNaN(timesheetEntry.BOTHr)) timesheetEntry.BOTHr = null; else timesheetEntry.BOTHr = parseFloat(timesheetEntry.BOTHr);
    if (isNaN(timesheetEntry.DTHr)) timesheetEntry.DTHr = null; else timesheetEntry.DTHr = parseFloat(timesheetEntry.DTHr);
    return timesheetEntry;
  }

  onModalCloseButtonClick() {
    this.selectedRow = new ProjectModel();
    this.selectedTask = new TaskModel();
    this.selectedEntry = new TimesheetModel();
    this.modalService.dismissAll();
  }

  showViewModal(project: ProjectModel, task: TaskModel, entry: TimesheetModel) {

  }

  updateTimesheetByGroup(event: Event, project: ProjectModel, task: TaskModel, entry: TimesheetModel, isNewRowAdded?: boolean) {
    if (this.canFireEvent) {
      if (isNewRowAdded == true) {
        entry.ProjectGuid = task['ProjectGuid'];
        entry.FeatureGuid = task['FeatureGuid'];
        // TODO check once server sends original `ProjectRoleGuid` into AutoComplete API call.
        entry.ProjectRoleGuid = task['ProjectRoleGuid'];
      }
      if (entry.RegularHr > 0 || entry.OTHr > 0 || entry.DTHr > 0 || entry.BOTHr > 0) {
        this.updateTimesheetRow.emit({event: event, project: project, task: task, entry: TableElementComponent.getTimesheetEntry(entry)});
        // this.newTask = new TaskModel();
        this.initializeNewAndSummaryRows();
      }
    }
    this.isNewRowAdded = false;
    this.canFireEvent = false;
  }

  /*

    updateTimesheetForDate(event: Event, row: any, col: any, isNewRow?: boolean) {
      if (this.canFireEvent) {
        if (isNewRow) {
          row.logsArray.forEach(item => {
            item[col.dbColumnId].ProjectGuid = row[col.columnName];
          });
        }
        this.updateTimesheetRow.emit({event: event, updatedRow: row, column: col});
      }
      this.isNewRowAdded = false;
      this.canFireEvent = false;
    }
  */

  onRowUpdated(event) {
    this.canFireEvent = true;
  }

  addNewRow(project: ProjectModel, task: TaskModel) {
    let rowItem = new TimesheetModel(null);
    let itemLogsArray = rowItem.logsArray || [];
    let timesheetArray: Array<TimesheetModel> = [];

    for (let index = this.tableHeaderStartingLoopIndex; index < this.tableHeaders.length; index++) {
      let currentColumn = this.tableHeaders[index];
      let columnUniqueKey = currentColumn.dbColumnId;
      let timesheetModel = new TimesheetModel({
        EmployeeGuid: this.storageService.getUserModel().employeeGuid,
        Date: currentColumn.displayLabel,
        ProjectGuid: null,
        FeatureGuid: null,
        Guid: null,
        RegularHr: null,
        OTHr: null,
        BOTHr: null,
        DTHr: null,
        SRNotes: null,
        IsLocked: true
      });
      itemLogsArray[columnUniqueKey] = timesheetModel;
      timesheetArray.push(timesheetModel);
      rowItem.logsArray = itemLogsArray;
    }
    for (let index = 0; index < this.tableHeaderStartingLoopIndex; index++) {
      let currentCol = this.tableHeaders[index];
      rowItem[currentCol.dbColumnId] = {autoCompleteDataList: []};
    }
    this.addedRow = rowItem;
    setTimeout(() => {
      this.isNewRowAdded = true;
      project.Tasks.push(new TaskModel({isNewTask: true, Timesheets: timesheetArray}));
    }, 100);
  }

  onAutoCompleteSearchQueryChanged(event: any, project: ProjectModel, task: TaskModel, _case: string) {
    switch (_case) {
      case 'ProjectGuid':
        let projectSearchObj = {
          search: (event.event) ? event.event : '',
        };
        this.autoCompleteService.projectSearchAutoCompleteCall(event.event, projectSearchObj).then((success: Array<any>) => {
          project.autoCompleteDataList = [...success];
        });

        return;
      case'FeatureGuid':
        let taskSearchObj = {
          search: (event.event) ? event.event : '',
          selectedProjectGuid: task['ProjectGuid']
        };
        this.autoCompleteService.taskSearchAutoCompleteCall(event.event, taskSearchObj).then((taskItemList: Array<any>) => {
          let filteredTasks = [];
          let allTasks = [];
          this.timesheetData.forEach(projectItem => {
            allTasks = [...projectItem.Tasks];
          });
          taskItemList.forEach(taskItem => {
          });

          this.timesheetData.forEach(projectItem => {
            projectItem.Tasks.forEach(taskItem => {
              let itemFound = taskItemList.filter(_taskItem => _taskItem.Guid == taskItem.FeatureGuid);
              if ((itemFound || []).length == 0) {
                filteredTasks.push()
              }
            });
          });
          task.autoCompleteDataList = [...taskItemList];
        });
        return;
      case'ProjectRole':
        let projectRoleSearchObj = {
          search: (event.event) ? event.event : '',
          ProjectGuid: task['ProjectGuid']
        };
        this.autoCompleteService.projectRoleSearchAutoCompleteCall(event.event, projectRoleSearchObj).then((success: Array<any>) => {
          this.projectRoleAutoCompleteData = [...success];
        });
        return;
    }
  }

  onAutoCompleteItemSelected(event: any, project: ProjectModel, task: TaskModel, property: string) {
    if (property == 'ProjectRoleGuid') {
      task[property] = event.event.ProjectRoleGuid;
    } else {
      task[property] = event.event.Guid;
    }
    if (property == 'ProjectGuid') {
      this.selectedAutoCompleteProject = event.event;
      let lockedTillDate = this.selectedAutoCompleteProject.LockedTillDate;
      task.Timesheets.forEach(entryItem => {
        let entryItemDate = entryItem.Date;
        if (moment(entryItemDate).isBefore(moment(lockedTillDate))) {
          entryItem.IsLocked = true;
        }
      });
    }
    if ((task.ProjectRoleGuid || "").length > 0 && (task.FeatureGuid || "").length > 0 && (task['ProjectGuid'] || "").length > 0) {
      console.info("all selected");
      task.Timesheets.forEach(entryItem => entryItem.IsLocked = false);
    }
  }

  deleteEntryForTask(row: ProjectModel, task: TaskModel) {
    const modalRef: NgbModalRef = this.modalService.open(ConfirmModalDialogComponent);
    modalRef.componentInstance.modalHeading = 'Confirmation';
    modalRef.componentInstance.modalBody = 'Are you sure, you want to delete all the Entries of ' + task.Task + '?';

    modalRef.result.then((response) => {
      if (response && response == true) {
        let entryToDeleteIDsArray: Array<string> = [];
        (task.Timesheets || []).forEach((entry: TimesheetModel) => {
          if (entry['Guid'] && entry['Guid'].toString().length > 0) {
            entryToDeleteIDsArray.push(entry['Guid']);
          }
        });
        if (entryToDeleteIDsArray.length > 0) {
          this.deleteTimesheetEntry.emit({'action': 'delete', 'timesheet_entry_guids': entryToDeleteIDsArray});
        }
      }
    });
  }

  removeNewAddedRow(event: MouseEvent) {
    let filteredItems = [...this.timesheetData.filter(item => {
      if (item.ProjectGuid && item.ProjectGuid.length > 0) {
        let itemTasks = [...item.Tasks.filter(taskItem => taskItem.FeatureGuid && taskItem.FeatureGuid.length > 0)];
        item.Tasks = [...itemTasks];
        return true;
      } else return false;
    })];
    this.timesheetData = [...filteredItems];
  }

  getTooltipSumForLogs(taskElement: any) {
    return (taskElement.RegularHr || 0) + (taskElement.OTHr || 0) + (taskElement.DTHr || 0) + (taskElement.BOTHr || 0) || 0;
  }

}
