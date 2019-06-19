import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {NavigationItemsModel} from "../../models/navigation-items-model";
import {NavigationBarHelperService} from "../../services/navigation-bar-helper.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.sass']
})
export class NavigationBarComponent implements OnInit {
  public isUserAuthenticated: boolean;
  isNavbarDropdownOpened: boolean;
  public userInitialNames: string = '';
  public userFullName: string = '';
  public navigationBarItems: Array<NavigationItemsModel> = [];
  @ViewChild('navbarDropdownButton') navbarDropdownButton: ElementRef;

  constructor(private router: Router,
              private authService: AuthService,
              private storageService: LocalStorageService,
              private navigationHelperService: NavigationBarHelperService) {
    this.navigationBarItems = navigationHelperService.getNavigationItems();
  }

  ngOnInit() {
    this.isUserAuthenticated = this.authService.isUserAuthenticated();
    this.userInitialNames = this.storageService.getUserModel().firstName.substr(0, 1) + this.storageService.getUserModel().lastName.substr(0, 1);
    this.userFullName = this.storageService.getUserModel().firstName + ' ' + this.storageService.getUserModel().lastName;
  }

  onLogoutButtonClicked() {
    this.storageService.clearAll();
    this.router.navigate(['login']);
  }

  showDropdownMenu($event: MouseEvent) {
    this.isNavbarDropdownOpened = !this.isNavbarDropdownOpened;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClicked(event: any) {
    // console.info('onDocumentClicked', event);
    if (!this.navbarDropdownButton.nativeElement.contains(event.target)) {
      this.isNavbarDropdownOpened = false;
    }
  }
}
