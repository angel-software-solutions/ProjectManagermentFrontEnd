import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {MainLayoutComponent} from "./app-layouts/main-layout/main-layout.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {TimesheetViewComponent} from "./common-components/timesheet-view/timesheet-view.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {TasksComponent} from "./components/tasks/tasks.component";
import {UsersComponent} from "./components/users/users.component";
import {MyProfileComponent} from "./components/my-profile/my-profile.component";
import {UserSettingsComponent} from "./components/user-settings/user-settings.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {ProjectExpenseComponent} from "./components/project-expense/project-expense.component";

const routes: Routes = [
  {
    component: MainLayoutComponent,
    path: '',
    canActivate: [AuthGuardService],
    children: [
      {
        component: TimesheetViewComponent,
        path: 'timesheet',
        pathMatch: 'full',
        children: [
          {
            path: 'week',
            pathMatch: 'full',
            component: HomePageComponent,
          }
        ]
      },
      {
        component: ProjectsComponent,
        pathMatch: 'full',
        path: 'projects',
      },
      {
        component: ProjectExpenseComponent,
        pathMatch: 'full',
        path: 'projects/expense/:guid'
      },
      {
        component: TasksComponent,
        pathMatch: 'full',
        path: 'tasks'
      },
      {
        component: UsersComponent,
        pathMatch: 'full',
        path: 'users'
      },
      {
        component: MyProfileComponent,
        pathMatch: 'full',
        path: 'profile'
      },
      {
        component: UserSettingsComponent,
        pathMatch: 'full',
        path: 'settings'
      }
    ]
  }, {
    component: LoginComponent,
    path: 'login',
    pathMatch: 'full',
  }, {
    component: PageNotFoundComponent,
    path: 'page-not-found',
    pathMatch: 'full',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
