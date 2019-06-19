import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SidebarHelperService} from "../../services/sidebar-helper.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  isSidebarVisible: boolean = false;
  @ViewChild('sideBarWrapper') sideBarWrapper: ElementRef;
  @ViewChild('navigationToggleBtn') navigationToggleBtn: ElementRef;
  @ViewChild('showContextMenu') showContextMenu: ElementRef;
  @ViewChild('navbarDropdownButton') navbarDropdownButton: ElementRef;

  public navigationItems: Array<any> = [];
  public contextMenuItems: Array<any> = [];
  public activeNavigationItem: any = {};
  public customNavItem: any;
  public customDropdownOptions: any[] = [];
  private listingItems: any[];
  searchTerm: string = '';
  isNavbarDropdownOpened: boolean = false;


  constructor(private changeDetectorRef: ChangeDetectorRef,
              private sidebarHelperService: SidebarHelperService,
              private router: Router) {
    this.navigationItems = [
      {
        label: 'Projects',
        id: 'project'
      }, {
        label: 'Employee',
        id: 'employee'
      }, {
        label: 'Favourite',
        id: 'favourite'
      }];
    this.contextMenuItems = [
      {
        label: 'Open',
      }, {
        label: 'Summery',
      }, {
        label: 'Time/Expense Report',
      }, {
        label: 'Service Report',
      }, {
        label: 'Budget',
      }, {
        label: 'Notes',
      }, {
        label: 'Estimate',
      }, {
        label: 'Duplicate Project',
      }, {
        label: 'Edit Project',
      }, {
        label: 'Status',
        items: [
          {
            label: 'Active'
          }, {
            label: 'Completed'
          }, {
            label: 'Not-Started'
          }, {
            label: 'Requires Help'
          }, {
            label: 'Waiting On-Hold'
          },
        ],
      }, {
        label: 'Add to Favourite',
      },
    ];
    this.customDropdownOptions = [
      {label: 'All Projects', id: 'all_projects', menuIcon: 'fa-briefcase', isCustomItem: true},
      {label: 'Completed Projects', id: 'completed_projects', menuIcon: 'fa-briefcase', isCustomItem: true},
      {label: 'Project Groups', id: 'project_groups', menuIcon: 'fa-briefcase', isCustomItem: true},
      {label: 'Teams', id: 'teams', menuIcon: 'fa-users', isCustomItem: true},
      {label: 'Inactive Employees', id: 'inactive_employees', menuIcon: 'fa-moon', isCustomItem: true},
      {label: 'Customers', id: 'customers', menuIcon: 'fa-user-tie', isCustomItem: true},
      {label: 'Refresh', id: 'refresh', menuIcon: 'fa-sync', isCustomItem: true},
    ];
    this.activeNavigationItem = this.navigationItems[0];
    this.customNavItem = Object.assign({}, this.customDropdownOptions[0]);
    this.customNavItem.isCustomItem = false;
  }

  ngOnInit() {
    this.listingItems = this.sidebarHelperService.getStaticProjectList();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  isNavItemActive(navItem: any) {
    return this.activeNavigationItem == navItem;
  }

  selectItem(navItem: any) {
    this.activeNavigationItem = navItem;
    if (!navItem.isCustomItem) {
      this.customNavItem = Object.assign({}, this.customDropdownOptions[0]);
      this.customNavItem.isCustomItem = false;
    }

    switch (navItem.id) {
      case 'project':
        this.listingItems = this.sidebarHelperService.getStaticProjectList();
        break;
      case 'employee':
        this.listingItems = [];
        break;
      case 'favourite':
        this.listingItems = [];
        break;
      case 'custom':
        this.listingItems = [];
        break;
      default:
        if (navItem.isCustomItem) {
          this.customNavItem = navItem;
        }
        break
    }
  }

  getItemCSSClass(projectItem: any) {
    // Replacing Space with Hyphen and converting to lower case
    let className = projectItem.status.replace(/ /g, '-');
    className = className.toLowerCase();
    return className;
  }

  showDropdownMenu() {
    this.isNavbarDropdownOpened = !this.isNavbarDropdownOpened;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClicked(event: any) {
    if (this.navbarDropdownButton && !this.navbarDropdownButton.nativeElement.contains(event.target)) {
      this.isNavbarDropdownOpened = false;
    }
  }

  isDropDownItemActive(optionItem: any) {
    return this.customNavItem.id === optionItem.id;
  }

  makeContextMenuVisible(event: MouseEvent, myContextMenu) {
    event.preventDefault();
    event.stopPropagation();
    // this.prepCm();
    myContextMenu.show(event);
    return false;
  }

  onProjectItemClicked(event: MouseEvent, projectItem: any) {
    this.isSidebarVisible = false;
    this.router.navigate(['projects', 'expense', projectItem.Guid]);
  }
}
