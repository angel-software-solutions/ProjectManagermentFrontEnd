import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {NavigationBarComponent} from './common-components/navigation-bar/navigation-bar.component';
import {AuthService} from "./services/auth.service";
import {LoginService} from "./services/login.service";
import {LocalStorageService} from "./services/local-storage.service";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {MainLayoutComponent} from "./app-layouts/main-layout/main-layout.component";
import {TimesheetViewComponent} from "./common-components/timesheet-view/timesheet-view.component";
import {HandleHttpErrorsService} from "./services/handle-http-errors.service";
import {TableRowElementComponent} from "./common-components/timesheet-view/timesheet-helpers/table-row-element.component";
import {TableCellElementComponent} from "./common-components/timesheet-view/timesheet-helpers/table-cell-element.component";
import {TableElementComponent} from "./common-components/timesheet-view/timesheet-helpers/timesheet-table-element.component";
import {AppAutoCompleteComponent} from "./common-components/app-auto-complete/app-auto-complete.component";
import {AutoCompleteService} from "./services/auto-complete.service";
import {ProjectsComponent} from "./components/projects/projects.component";
import {TasksComponent} from "./components/tasks/tasks.component";
import {UsersComponent} from "./components/users/users.component";
import {ConfirmModalDialogComponent} from "./common-components/modals/confirm-modal-dialog/confirm-modal-dialog.component";
import {AllowOnlyNumbersDirective} from "./custom-directives/allow-only-numbers.directive";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";
import {UserSettingsComponent} from "./components/user-settings/user-settings.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {NavigationBarHelperService} from "./services/navigation-bar-helper.service";
import {CommonDataGridComponent} from "./common-components/common-data-grid/common-data-grid.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {SidebarHelperService} from "./services/sidebar-helper.service";
import {FilterArrayPipe} from "./services/filter-array.pipe";
import {ProjectExpenseComponent} from "./components/project-expense/project-expense.component";


export const appComponents = [
  MainLayoutComponent,
  AppComponent,
  LoginComponent,
  NavigationBarComponent,
  HomePageComponent,
  TimesheetViewComponent,
  TableCellElementComponent,
  TableRowElementComponent,
  TableElementComponent,
  AppAutoCompleteComponent,
  ProjectsComponent,
  TasksComponent,
  UsersComponent,
  ConfirmModalDialogComponent,
  AllowOnlyNumbersDirective,
  MyProfileComponent,
  UserSettingsComponent,
  PageNotFoundComponent,
  CommonDataGridComponent,
  SidebarComponent,
  FilterArrayPipe,
  ProjectExpenseComponent,
];


export const appServices = [
  AuthService,
  LoginService,
  LocalStorageService,
  AuthGuardService,
  HandleHttpErrorsService,
  AutoCompleteService,
  AllowOnlyNumbersDirective,
  NavigationBarHelperService,
  SidebarHelperService,
];

export const appEntryComponents = [
  ConfirmModalDialogComponent
];
