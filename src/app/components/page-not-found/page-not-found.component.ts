import {Component, OnInit} from '@angular/core';
import {NavigationBarHelperService} from "../../services/navigation-bar-helper.service";
import {NavigationItemsModel} from "../../models/navigation-items-model";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.sass']
})
export class PageNotFoundComponent implements OnInit {
  public navigationBarItems: Array<NavigationItemsModel> = [];

  constructor(private navigationService: NavigationBarHelperService) {
    this.navigationBarItems = navigationService.getNavigationItems();
  }

  ngOnInit() {
  }

}
