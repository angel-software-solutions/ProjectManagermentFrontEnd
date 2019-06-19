import {Injectable} from '@angular/core';
import {NavigationItemsModel} from "../models/navigation-items-model";

@Injectable({
  providedIn: 'root'
})
export class NavigationBarHelperService {

  private readonly navigationBarItems: Array<NavigationItemsModel> = [];

  constructor() {
    this.navigationBarItems = [
      {
        displayLabel: 'Projects',
        id: 'Projects',
        route: '/projects',
        iconClass: 'fa-folder',
        children: null,
      }, {
        displayLabel: 'Tasks',
        id: 'Tasks',
        route: '/tasks',
        iconClass: 'fa-paper-plane',
        children: null,
      }, {
        displayLabel: 'Timesheet',
        id: 'Timesheet',
        route: '/timesheet',
        iconClass: 'fa-calendar-alt',
        children: null,
      }, {
        displayLabel: 'Users',
        id: 'Users',
        route: '/users',
        iconClass: 'fa-users',
        children: null,
      }
    ];
  }

  public getNavigationItems(): Array<NavigationItemsModel> {
    return this.navigationBarItems;
  }
}
