import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { MainLayoutComponent } from "./app-layouts/main-layout/main-layout.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { TimesheetViewComponent } from "./common-components/timesheet-view/timesheet-view.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { TasksComponent } from "./components/tasks/tasks.component";
import { UsersComponent } from "./components/users/users.component";
import { MyProfileComponent } from "./components/my-profile/my-profile.component";
import { UserSettingsComponent } from "./components/user-settings/user-settings.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ProjectExpenseComponent } from "./components/project-expense/project-expense.component";
import { ProjectFormComponent } from "./components/project-form/project-form.component";
import { EmployeeComponent } from "./components/employee/employee.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { CustomersViewComponent } from "./components/customers-view/customers-view.component";

const routes: Routes = [
  {
    component: MainLayoutComponent,
    path: "",
    canActivate: [AuthGuardService],
    children: [
      {
        component: TimesheetViewComponent,
        path: "timesheet",
        pathMatch: "full",
        children: [
          {
            path: "week",
            pathMatch: "full",
            component: HomePageComponent
          }
        ]
      },
      {
        component: ProjectsComponent,
        pathMatch: "full",
        path: "projects"
      },
      {
        component: ProjectFormComponent,
        pathMatch: "full",
        path: "projects/new"
      },
      {
        component: ProjectFormComponent,
        pathMatch: "full",
        path: "projects/edit/:guid"
      },
      {
        component: ProjectExpenseComponent,
        pathMatch: "full",
        path: "projects/expense/:guid"
      },
      {
        component: TasksComponent,
        pathMatch: "full",
        path: "tasks"
      },
      {
        component: UsersComponent,
        pathMatch: "full",
        path: "users"
      },
      {
        component: EmployeeListComponent,
        pathMatch: "full",
        path: "employees"
      },
      {
        component: EmployeeComponent,
        pathMatch: "full",
        path: "employees/new"
      },
      {
        component: CustomersViewComponent,
        pathMatch: "full",
        path: "customers"
      },
      {
        component: CustomersComponent,
        pathMatch: "full",
        path: "customers/new"
      },
      {
        component: CustomersComponent,
        pathMatch: "full",
        path: "customers/edit/:guid"
      },
      {
        component: MyProfileComponent,
        pathMatch: "full",
        path: "profile"
      },
      {
        component: UserSettingsComponent,
        pathMatch: "full",
        path: "settings"
      }
    ]
  },
  {
    component: LoginComponent,
    path: "login",
    pathMatch: "full"
  },
  {
    component: PageNotFoundComponent,
    path: "page-not-found",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
