import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';


import {TimesheetService} from "../../services/timesheet.service";
import {HandleHttpErrorsService} from "../../services/handle-http-errors.service";
import * as moment from 'moment/moment';
import {TimesheetModel} from "../../models/timesheet-model";
import {AutoCompleteService} from "../../services/auto-complete.service";
import {ProjectModel} from "../../models/project-model";
import {LocalStorageService} from "../../services/local-storage.service";
import {TaskModel} from "../../models/task-model";
import {DateUtilsService} from "../../services/date-utils.service";
import {ConfirmModalDialogComponent} from "../modals/confirm-modal-dialog/confirm-modal-dialog.component";

@Component({
  selector: 'app-timesheet-view',
  templateUrl: './timesheet-view.component.html',
  styleUrls: ['./timesheet-view.component.sass']
})
export class TimesheetViewComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('createNewModal') createNewModalRef: TemplateRef<any>;

  private weekStartDay: moment.Moment;
  private weekEndDay: moment.Moment;
  private tableHeaderStartingLoopIndex: number = 3;
  // private copyOfCurrentTimesheetView: Array<ProjectModel>;

  public timesheetData: Array<ProjectModel>;
  public calendarView: string = 'weeks';
  public tableHeaders: any;
  public stringPageHeading: string;
  public selectedProject: any;
  public selectedTask: any;
  public selectedProjectRole: any;
  public projectAutoCompleteDataList: Array<any>;
  public taskAutoCompleteDataList: any[];
  public projectRoleAutoCompleteDataList: any[];
  public newModal: TimesheetModel = new TimesheetModel(null);
  public ckEditorToolbarConfig: any;
  public summeryRow: TaskModel = new TaskModel();
  isNotCurrentWeek: boolean = false;

  constructor(private timesheetService: TimesheetService,
              private dateUtils: DateUtilsService,
              private modalService: NgbModal,
              private toasterService: ToastrService,
              private handleHttpError: HandleHttpErrorsService,
              private autoCompleteService: AutoCompleteService,
              private storageService: LocalStorageService) {
    // @ts-ignore
    moment.updateLocale('en', {
      week: {
        dow: 1,
      }
    });
    this.prepareTableHeaders(this.calendarView);
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

  private prepareTableHeaders(viewType: any, weekStatingDay?: any) {
    this.tableHeaders = [
      {
        displayLabel: 'Project',
        dbColumnId: 'Project',
        cellId: 1,
        dataType: 'string',
        editDataType: 'autoComplete',
        searchKeyword: 'Number',
        columnName: 'ProjectGuid',
        minWidth: '110px'
      },
      {
        displayLabel: 'Task',
        dbColumnId: 'Task',
        cellId: 1,
        dataType: 'string',
        editDataType: 'autoComplete',
        searchKeyword: 'Description',
        columnName: 'FeatureGuid',
        minWidth: '140px'
      }, {
        displayLabel: 'Project Role',
        dbColumnId: 'ProjectRole',
        cellId: 1,
        dataType: 'string',
        editDataType: 'autoComplete',
        searchKeyword: 'Description',
        columnName: 'ProjectRole',
        minWidth: '140px'
      }
    ];
    const today = (weekStatingDay) ? moment(weekStatingDay).clone() : moment().clone();
    this.weekStartDay = moment(today).startOf(viewType);
    const weekEndDay = moment(today).endOf(viewType);
    this.summeryRow.Timesheets = [];
    while (moment(this.weekStartDay).diff(moment(weekEndDay)) < 0) {
      let displayDate = moment(this.weekStartDay).toDate();
      this.tableHeaders.push({
        displayLabel: displayDate,
        dbColumnId: moment(this.weekStartDay).toISOString().replace(/-/g, '_').replace(/:/g, '_').replace('.', '_'),
        cellId: 1,
        dataType: 'date',
        editDataType: 'date'
      });
      this.summeryRow.Timesheets.push(new TimesheetModel({
        Date: displayDate,
        RegularHr: 0,
        OTHr: 0,
        BOTHr: 0,
        DTHr: 0,
        summeryRowTotal: 0
      }));
      this.weekStartDay = moment(this.weekStartDay).add(1, 'days');
    }
    this.weekStartDay = moment(today).startOf(viewType);
    this.weekEndDay = weekEndDay;
    this.generatePageHeading();
  }

  private generatePageHeading(): void {
    let weekStartDay = moment(this.tableHeaders[this.tableHeaderStartingLoopIndex].displayLabel);
    let weekEndDay = moment(this.tableHeaders[(this.tableHeaders.length - 1)].displayLabel);
    if (!weekStartDay.isSame(weekEndDay, 'year') && weekStartDay.isSame(weekEndDay, 'month')) {
      this.stringPageHeading = weekStartDay.format('MMM') + ' ' + weekStartDay.format('DD') + ', ' + weekStartDay.format('gggg') + ' - ' + weekEndDay.format('MMM') + '' + weekEndDay.format('DD') + ', ' + weekEndDay.format('gggg');
    } else if (weekStartDay.isSame(weekEndDay, 'year') && !weekStartDay.isSame(weekEndDay, 'month')) {
      this.stringPageHeading = weekStartDay.format('MMM') + ' ' + weekStartDay.format('DD') + ' - ' + weekEndDay.format('MMM') + ' ' + weekEndDay.format('DD') + ', ' + weekStartDay.format('gggg');
    } else {
      this.stringPageHeading = weekStartDay.format('MMM') + ' ' + weekStartDay.format('DD') + ' - ' + weekEndDay.format('DD') + ', ' + weekStartDay.format('gggg');
    }
  }


  ngOnInit() {
    this.loadTimesheetAllData();
  }

  private updateTimesheetRowsForTimeEntries(response: Array<ProjectModel>, canSaveLogs?: boolean): Array<ProjectModel> {
    this.summeryRow.Timesheets.forEach((summeryItem: TimesheetModel) => {
      summeryItem.RegularHr = 0;
      summeryItem.OTHr = 0;
      summeryItem.BOTHr = 0;
      summeryItem.DTHr = 0;
    });
    response.forEach(project => {
      let projectGuid = project.ProjectGuid;

      project.Tasks.forEach(task => {
        let taskGuid = task.FeatureGuid;
        let projectRoleGuid = task.ProjectRoleGuid;
        task['rowSum'] = {
          RegularHr: 0,
          OTHr: 0,
          BOTHr: 0,
          DTHr: 0,
        };

        for (let index = this.tableHeaderStartingLoopIndex; index < this.tableHeaders.length; index++) {
          let currentTableHeader = this.tableHeaders[index];
          let currentHeaderDate = currentTableHeader.displayLabel;
          let filteredItem = [];
          if (task.Timesheets && task.Timesheets.length > 0) {
            filteredItem = task.Timesheets.filter(entryItem => {

              let entryItemDate = moment(entryItem.Date);
              let itemExistsOnDate = entryItemDate.isSame(currentHeaderDate, 'year') && entryItemDate.isSame(currentHeaderDate, 'month') && entryItemDate.isSame(currentHeaderDate, 'day');
              if (itemExistsOnDate) {
                entryItem.FeatureGuid = taskGuid;
                entryItem.ProjectGuid = projectGuid;
                entryItem.ProjectRoleGuid = projectRoleGuid;

                if (entryItem.FeatureGuid == task.FeatureGuid) {
                  task['rowSum'].RegularHr += entryItem.RegularHr;
                  task['rowSum'].OTHr += entryItem.OTHr;
                  task['rowSum'].BOTHr += entryItem.BOTHr;
                  task['rowSum'].DTHr += entryItem.DTHr;
                }
                this.summeryRow.Timesheets.find((summeryItem: TimesheetModel) => {
                  let itemDate = moment(summeryItem.Date);
                  if (itemDate.isSame(currentHeaderDate, 'year') && itemDate.isSame(currentHeaderDate, 'month') && itemDate.isSame(currentHeaderDate, 'day')) {
                    summeryItem.RegularHr += entryItem.RegularHr;
                    summeryItem.OTHr += entryItem.OTHr;
                    summeryItem.BOTHr += entryItem.BOTHr;
                    summeryItem.DTHr += entryItem.DTHr;
                    return true;
                  } else return false;
                });
              }
              // Copying timesheet to current week
              if (canSaveLogs && DateUtilsService.isWeekDaySame(entryItem.Date, currentHeaderDate) && !entryItem.isEntrySaved && (entryItem.RegularHr > 0 || entryItem.BOTHr > 0 || entryItem.OTHr > 0 && entryItem.DTHr > 0)) {
                entryItem['Guid'] = null;
                entryItem.Date = currentHeaderDate.toISOString();
                this.onTableElementUpdateTimesheetListener({entry: entryItem}, true);
                entryItem.isEntrySaved = true;
              }

              return itemExistsOnDate;
            });
          }

          if (!(task.Timesheets))
            task.Timesheets = [];

          if (filteredItem.length <= 0) {
            task.Timesheets.push({
              isEntrySaved: false,
              summeryRowTotal: 0,
              timesheet_guid: undefined,
              ProjectRole: undefined,
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
              FeatureGuid: taskGuid,
              ProjectGuid: projectGuid,
              Date: currentHeaderDate,
              ProjectRoleGuid: projectRoleGuid,
              EmployeeGuid: this.storageService.getUserModel().employeeGuid
            });
          }
        }

        /**
         * Temporary Hack to manage inputs of Date
         */
        let tempTimesheetItems = Object.assign([], task.Timesheets);
        let filterItems = tempTimesheetItems.filter(timesheetItem => moment(timesheetItem.Date).valueOf() >= moment(this.weekStartDay).valueOf() && moment(this.weekEndDay).valueOf() >= moment(timesheetItem.Date).valueOf());

        task.Timesheets = [...filterItems];

        let tempSortedEntries = task.Timesheets.sort((a: any, b: any) =>
          new Date(a.Date).getTime() - new Date(b.Date).getTime()
        );
        let tempSortedSummeryEntries = this.summeryRow.Timesheets.sort((a: any, b: any) =>
          new Date(a.Date).getTime() - new Date(b.Date).getTime()
        );
        task.Timesheets = [...tempSortedEntries];
        this.summeryRow.Timesheets = tempSortedSummeryEntries;
      });
    });
    return response;
  }

  private loadTimesheetAllData() {
    let queryParams = {
      EmployeeGuid: this.storageService.getUserModel().employeeGuid,
      StartDate: this.weekStartDay.utc().toISOString(),
      EndDate: moment(this.weekEndDay).utc().toISOString()
    };
    this.timesheetService.getTimesheetData(queryParams)
      .then((success: Array<ProjectModel>) => {
        if (success && success.length > 0) {
          this.summeryRow.Timesheets.forEach(entry => entry.summeryRowTotal = 0);
          success = this.updateTimesheetRowsForTimeEntries(success);
        }
        this.isTodayBetweenWeek(queryParams.StartDate, queryParams.EndDate);
        this.timesheetData = [...success];
      }, error => {
        this.handleHttpError.handleHttpError(error);
      });
  }

  private isTodayBetweenWeek(startDate: any, endDate: any) {
    let today = moment();
    this.isNotCurrentWeek = today.isBetween(startDate, endDate);
    return this.isNotCurrentWeek;
  }

  onCalendarNextButtonClicked() {
    let today = moment(this.weekStartDay).clone().add(1, 'week').add(1, "days");
    this.prepareTableHeaders(this.calendarView, today);
    this.loadTimesheetAllData();
  }

  onCalendarTodayButtonClicked() {
    this.prepareTableHeaders(this.calendarView, moment());
    this.loadTimesheetAllData();
  }

  onCalendarPreviousButtonClicked() {
    let startingDay = moment(this.weekStartDay).clone().subtract(1, 'week').clone().add(1, 'days');
    this.prepareTableHeaders(this.calendarView, startingDay);
    this.loadTimesheetAllData();
  }

  onAddNewEntryButtonClicked() {
    this.modalService.open(this.createNewModalRef, {size: 'lg'});
  }

  onProjectAutoCompleteItemSelected(event: any) {
    this.selectedProject = event.event;
    this.newModal.ProjectGuid = event.event.Guid;
  }

  onProjectAutoCompleteSearchQueryChanged(event: any) {
    let searchObject = {
      search: (event.event) ? event.event : ''
    };
    this.autoCompleteService.projectSearchAutoCompleteCall(event.event, searchObject).then((success: Array<any>) => {
      this.projectAutoCompleteDataList = [...success];
    });
  }

  onTaskAutoCompleteItemSelected(event: any) {
    this.selectedTask = event.event;
    this.newModal.FeatureGuid = event.event.Guid;
  }

  onTaskAutoCompleteSearchQueryChanged(event: any) {
    let searchObject = {
      search: (event.event) ? event.event : '',
      selectedProjectGuid: this.selectedProject.Guid
    };
    this.autoCompleteService.taskSearchAutoCompleteCall(event.event, searchObject).then((success: Array<any>) => {
      this.taskAutoCompleteDataList = [...success];
    });
  }

  onProjectRoleAutoCompleteItemSelected(event: any) {
    this.selectedProjectRole = event.event;
    this.newModal.ProjectRoleGuid = event.event.ProjectRoleGuid;
  }

  onProjectRoleAutoCompleteSearchQueryChanged(event: any) {
    let searchObject = {
      search: (event.event) ? event.event : '',
      ProjectGuid: this.selectedProject.Guid
    };
    this.autoCompleteService.projectRoleSearchAutoCompleteCall(event.event, searchObject).then((success: Array<any>) => {
      this.projectRoleAutoCompleteDataList = [...success];
    });
  }

  changeCalendarView(calendarViewType: string) {
    this.calendarView = calendarViewType;
  }


  onTableElementUpdateTimesheetListener(event: any, ifCanLoadNewData?: boolean) {
    let timesheetModel: TimesheetModel = event.entry;

    if (timesheetModel.RegularHr == 0 && timesheetModel.BOTHr == 0 && timesheetModel.DTHr == 0 && timesheetModel.OTHr == 0 && timesheetModel.timesheet_guid) {
      this.timesheetService.deleteTimesheetEntry([timesheetModel.timesheet_guid]).then(success => {
        console.info('Entry deleted successfully. ', success);
      }, error => {
        console.info('Not able to delete entry at this time. ', error);
      });
      return;
    }

    timesheetModel.EmployeeGuid = this.storageService.getUserModel().employeeGuid;
    timesheetModel.Date = DateUtilsService.getUtcISOStringDate(timesheetModel.Date);

    if (!timesheetModel.timesheet_guid) {
      timesheetModel.timesheet_guid = timesheetModel['Guid'];
    }

    if (timesheetModel.timesheet_guid && timesheetModel.timesheet_guid.length > 0) {
      this.timesheetService.updateTimesheetRow(timesheetModel).then(success => {
        if (!ifCanLoadNewData) {
          this.toasterService.success("Timesheet updated successfully.");
          this.loadTimesheetAllData();
        }
      }, () => {
        if (!ifCanLoadNewData) {
          this.toasterService.error("Not able to update timesheet at this time, please try again later.");
          this.loadTimesheetAllData();
        }
      });
    } else {
      if (!(timesheetModel.timesheet_guid && timesheetModel.timesheet_guid.length > 0)) timesheetModel.timesheet_guid = null;

      this.timesheetService.createTimesheetRow(timesheetModel).then(() => {
        if (!ifCanLoadNewData) {
          this.loadTimesheetAllData();
          this.toasterService.success("Timesheet created successfully.");
        }
      }, () => {
        if (!ifCanLoadNewData) {
          this.loadTimesheetAllData();
          this.toasterService.error("Not able to create timesheet at this time, please try again later.");
        }
      });
    }
  }

  public addTimesheetEntry() {
    let timesheetModel = new TimesheetModel(null);
    timesheetModel.ProjectGuid = this.newModal.ProjectGuid;
    timesheetModel.FeatureGuid = this.newModal.FeatureGuid;
    timesheetModel.Date = moment().toISOString();
    timesheetModel.RegularHr = this.newModal.RegularHr;
    timesheetModel.OTHr = this.newModal.OTHr;
    timesheetModel.BOTHr = this.newModal.BOTHr;
    timesheetModel.DTHr = this.newModal.DTHr;
    timesheetModel.SRNotes = this.newModal.SRNotes;
    timesheetModel.EmployeeGuid = this.storageService.getUserModel().employeeGuid;
    timesheetModel.ProjectRoleGuid = this.newModal.ProjectRoleGuid;

    this.timesheetService.createTimesheetRow(timesheetModel).then(success => {
      this.newModal = new TimesheetModel(null);
      this.modalService.dismissAll();
      this.loadTimesheetAllData();
    }, () => {
    });
  }

  refreshTimesheet() {
    this.loadTimesheetAllData();
  }

  deleteTimesheetEntry(event: any, canReloadData?: boolean) {
    this.timesheetService.deleteTimesheetEntry(event.timesheet_entry_guids).then(() => {
      if (!canReloadData) {
        this.loadTimesheetAllData();
        this.toasterService.success("Timesheet entry deleted successfully.");
      }
    });
  }

  copyTimesheetToCurrentWeek(event: MouseEvent) {
    let currentWeekStartDay = moment().startOf('weeks');
    if (this.weekStartDay.isSame(currentWeekStartDay, 'year') && this.weekStartDay.isSame(currentWeekStartDay, 'month') && this.weekStartDay.isSame(currentWeekStartDay, 'day')) {
      this.toasterService.warning('Can not copy this timesheet to current week, please select an past week timesheet.', 'Warning');
      return;
    }
    this.doesTimesheetHavingAnyEntryForCurrentWeek().then((success: Array<any>) => {
      let currentWeekQueryParams = {
        EmployeeGuid: this.storageService.getUserModel().employeeGuid,
        StartDate: this.weekStartDay.utc().toISOString(),
        EndDate: this.weekEndDay.utc().toISOString()
      };
      if ((success || []).length > 0) {
        let confirmModal = this.modalService.open(ConfirmModalDialogComponent);
        confirmModal.componentInstance.modalHeading = 'Are you sure?';
        confirmModal.componentInstance.modalBody = 'There is already timesheet exists in current week, do you want to overwrite it?';
        confirmModal.result.then((canPerformAction) => {
          if (canPerformAction && canPerformAction == true) {
            this.deleteBulkTimesheetEntries(success);
            this.performCopyToCurrentWeek(currentWeekQueryParams);
          }
        });
      } else {
        this.performCopyToCurrentWeek(currentWeekQueryParams);
      }
    });
  }

  private performCopyToCurrentWeek(currentWeekQueryParams: any) {
    this.timesheetService.getTimesheetData(currentWeekQueryParams).then((success: Array<ProjectModel>) => {
      this.weekStartDay = moment().startOf('weeks');
      this.weekEndDay = moment().endOf('weeks');
      this.prepareTableHeaders(this.calendarView);

      this.summeryRow.Timesheets.forEach(entry => entry.summeryRowTotal = 0);
      success = [...this.updateTimesheetRowsForTimeEntries(success, true)];
      this.timesheetData = [...success];
      this.toasterService.info("Timesheet copied to current week.");
      setTimeout(() => this.loadTimesheetAllData(), 100);
    }, () => {
      this.toasterService.error('Not able to copy Timesheet to current week, please try again later.');
    });
  }

  private doesTimesheetHavingAnyEntryForCurrentWeek() {
    let weekStartDay = moment().startOf('weeks');
    let weekEndDay = moment().endOf('weeks');
    let queryParams = {
      EmployeeGuid: this.storageService.getUserModel().employeeGuid,
      StartDate: weekStartDay.utc().toISOString(),
      EndDate: weekEndDay.utc().toISOString()
    };
    return new Promise((onRequestFulfilled, onRequestRejected) => {
      this.timesheetService.getTimesheetData(queryParams).then(success => onRequestFulfilled(success), error => onRequestRejected(error));
    });
  }

  copyTimesheetFromPreviousWeek(event: MouseEvent) {
    this.doesTimesheetHavingAnyEntryForCurrentWeek().then((success: Array<any>) => {
      let previousWeekStartingDay = moment(this.weekStartDay).clone().subtract(1, 'week').add(1, 'days');
      let currentWeekQueryParams = {
        EmployeeGuid: this.storageService.getUserModel().employeeGuid,
        StartDate: previousWeekStartingDay.startOf('week').utc().toISOString(),
        EndDate: previousWeekStartingDay.endOf('week').utc().toISOString()
      };
      if ((success || []).length > 0) {
        let confirmModal = this.modalService.open(ConfirmModalDialogComponent);
        confirmModal.componentInstance.modalHeading = 'Are you sure?';
        confirmModal.componentInstance.modalBody = 'There is already timesheet exists in current week, do you want to overwrite it?';
        confirmModal.result.then((response) => {
          if (response && response == true) {
            this.deleteBulkTimesheetEntries(success);
            this.performCopyToCurrentWeek(currentWeekQueryParams);
          }
        });
      } else {
        this.performCopyToCurrentWeek(currentWeekQueryParams);
      }
    });
  }

  private deleteBulkTimesheetEntries(success: Array<any>) {
    (success.map(project => project.Tasks) || []).forEach(tasks => {
      tasks.forEach(taskItem => {
        let taskGuids = [];
        taskItem.Timesheets.forEach(timesheet => {
          taskGuids.push(timesheet.Guid);
        });
        if (taskGuids.length > 0)
          this.deleteTimesheetEntry({timesheet_entry_guids: taskGuids}, true);

      });
    });
  }
}
