import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  ViewChild
} from "@angular/core";
import { Router } from "@angular/router";
import { SidebarHelperService } from "../../services/sidebar-helper.service";
import { ProjectsService } from "../../services/projects.service";
import { EmployeeService } from "../../services/employee.service";
import { CommonConstantsService } from "../../services/common-constants.service";
import { GroupService } from "../../services/group.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.sass"]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  isSidebarVisible: boolean = false;
  @ViewChild("sideBarWrapper") sideBarWrapper: ElementRef;
  @ViewChild("navigationToggleBtn") navigationToggleBtn: ElementRef;
  @ViewChild("showContextMenu") showContextMenu: ElementRef;
  @ViewChild("navbarDropdownButton") navbarDropdownButton: ElementRef;

  public navigationItems: Array<any> = [];
  public contextMenuItems: Array<any> = [];
  public activeNavigationItem: any = {};
  public customNavItem: any;
  public customDropdownOptions: any[] = [];
  private projectListingItems: any[];
  searchTerm: string = "";
  isNavbarDropdownOpened: boolean = false;
  public searchQueryParams: any = { search: "" };
  private employees: Array<any>;
  private inActiveEmployee: any[];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private sidebarHelperService: SidebarHelperService,
    private projectService: ProjectsService,
    private employeeService: EmployeeService,
    private groupService: GroupService,
    private router: Router
  ) {
    this.navigationItems = [
      /*{
        label: 'Projects',
        id: 'project'
      },*/ {
        label: "Favourites",
        id: "favourite",
        isDisabled: true
      },
      {
        label: "Active",
        id: "active",
        isDisabled: true
      },
      {
        label: "Employees",
        id: "employee",
        isDisabled: false
      }
    ];
    this.contextMenuItems = [
      {
        label: "Open"
      },
      {
        label: "Summery"
      },
      {
        label: "Time/Expense Report"
      },
      {
        label: "Service Report"
      },
      {
        label: "Budget"
      },
      {
        label: "Notes"
      },
      {
        label: "Estimate"
      },
      {
        label: "Duplicate Project"
      },
      {
        label: "Edit Project"
      },
      {
        label: "Status",
        items: [
          {
            label: "Active"
          },
          {
            label: "Completed"
          },
          {
            label: "Not-Started"
          },
          {
            label: "Requires Help"
          },
          {
            label: "Waiting On-Hold"
          }
        ]
      },
      {
        label: "Add to Favourite"
      }
    ];
    this.customDropdownOptions = [
      {
        label: "All Projects",
        id: "all_projects",
        menuIcon: "fa-briefcase",
        isCustomItem: true
      },
      {
        label: "Completed Projects",
        id: "completed_projects",
        menuIcon: "fa-briefcase",
        isCustomItem: true
      },
      {
        label: "Project Groups",
        id: "project_groups",
        menuIcon: "fa-briefcase",
        isCustomItem: true
      },
      { label: "Teams", id: "teams", menuIcon: "fa-users", isCustomItem: true },
      {
        label: "Inactive Employees",
        id: "inactive_employees",
        menuIcon: "fa-moon",
        isCustomItem: true
      },
      {
        label: "Customers",
        id: "customers",
        menuIcon: "fa-user-tie",
        isCustomItem: true
      },
      {
        label: "Refresh",
        id: "refresh",
        menuIcon: "fa-sync",
        isCustomItem: true
      }
    ];
    this.customNavItem = Object.assign({}, this.customDropdownOptions[0]);
    this.activeNavigationItem = this.customNavItem;
    this.customNavItem.isCustomItem = true;
    this.loadAllProjects();
    this.loadEmployees();
    // this.loadInActiveEmployees();
  }

  ngOnInit() {}

  private getAllGroup() {
    this.groupService.getAllGroups().then(
      success => {
        this.customDropdownOptions[2].children = success;
      },
      error => {}
    );
  }

  private loadAllProjects() {
    this.projectService.getAllProjectForNavigation(this.searchQueryParams).then(
      (success: Array<any>) => {
        this.ngZone.run(() => {
          this.projectListingItems = [...success];
        });
        this.changeDetectorRef.detectChanges();
      },
      onError => {}
    );
  }

  private loadEmployees() {
    this.employeeService
      .getAllEmployeesByTerms(this.searchQueryParams)
      .then(
        (success: Array<any>) => (this.employees = [...success]),
        error => {}
      );
  }

  private loadInActiveEmployees() {
    this.employeeService
      .getAllInActiveEmployee()
      .then(
        (success: Array<any>) => (this.inActiveEmployee = [...success]),
        error => {}
      );
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.searchQueryParams.search = "";
  }

  isNavItemActive(navItem: any) {
    return this.activeNavigationItem == navItem;
  }

  selectItem(navItem: any) {
    //
    // todo Make a refresh call for all current data as previous filter
    console.info("selectItem", navItem);
    if (navItem.id !== "refresh") {
      this.activeNavigationItem = navItem;
      if (navItem.isCustomItem) {
        this.customNavItem = navItem;
        // Object.assign({}, this.customDropdownOptions[0]);
        // this.customNavItem.isCustomItem = false;
      }
    }
    switch (navItem.id) {
      case "all_projects":
        this.loadAllProjects();
        this.customNavItem = navItem;
        break;

      case "completed_projects":
        this.searchQueryParams["projectStatus"] =
          CommonConstantsService.ProjectStatus.COMPLETED;
        this.loadAllProjects();
        this.customNavItem = navItem;
        break;

      case "project_groups":
        this.projectListingItems = [];
        break;

      case "inactive_employees":
        this.loadInActiveEmployees();
        break;

      case "teams":
        this.projectListingItems = [];
        break;

      case "inactive_employees":
        this.projectListingItems = [];
        break;

      case "customers":
        this.projectListingItems = [];
        break;

      case "employee":
        this.loadEmployees();
        break;

      case "favourite":
        this.projectListingItems = [];
        break;

      case "custom":
        this.projectListingItems = [];
        break;

      default:
        /*if (navItem.isCustomItem) {
          this.customNavItem = navItem;
        }*/
        break;
    }
  }

  getItemCSSClass(projectItem: any) {
    return projectItem.status.replace(/ /g, "-").toLowerCase();
  }

  showDropdownMenu() {
    this.isNavbarDropdownOpened = !this.isNavbarDropdownOpened;
  }

  @HostListener("document:click", ["$event"])
  onDocumentClicked(event: any) {
    if (
      this.navbarDropdownButton &&
      !this.navbarDropdownButton.nativeElement.contains(event.target)
    ) {
      this.isNavbarDropdownOpened = false;
      this.searchQueryParams.search = "";
    }
  }

  isDropDownItemActive(optionItem: any) {
    return this.customNavItem.id === optionItem.id;
  }

  makeContextMenuVisible(event: MouseEvent, myContextMenu) {
    event.preventDefault();
    event.stopPropagation();
    myContextMenu.show(event);
    return false;
  }

  onProjectItemClicked(event: MouseEvent, projectItem: any) {
    this.isSidebarVisible = false;
    this.router.navigate(["projects", "expense", projectItem.guid]);
  }

  onSearchQueryChangedEventListener(event) {
    console.info("onSearchQueryChangedEventListener", event);
  }
}
