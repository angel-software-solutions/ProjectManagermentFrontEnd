import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectsService} from "../../services/projects.service";
import {ProjectModel} from "../../models/project-model";
import {ProjectExpenseHelperService} from "../../services/project-expense-helper.service";

@Component({
  selector: 'app-project-expense',
  templateUrl: './project-expense.component.html',
  styleUrls: ['./project-expense.component.sass']
})
export class ProjectExpenseComponent implements OnInit, OnDestroy {
  private currentProjectGuid: string;
  private readonly routerParamsSubscription;
  public currentProject: ProjectModel;
  isAllRowsExpanded: boolean = true;
  private tableColumns: Array<any>;
  expenseRows: Array<any>;

  constructor(private projectService: ProjectsService,
              private expenseService: ProjectExpenseHelperService,
              private activateRoute: ActivatedRoute) {
    this.routerParamsSubscription = this.activateRoute.params.subscribe(params => {
      this.currentProjectGuid = params['guid'];
      this.getProjectDetailsByGuid();
    });
    this.tableColumns = [
      {field: 'name', header: 'Name'},
      {field: 'size', header: 'Size'},
      {field: 'type', header: 'Type'}
    ];
  }

  ngOnInit() {
    this.getProjectDetailsByGuid();
    this.expenseRows = this.expenseService.getStaticData();
    this.expenseRows = [...this.collapseExpandAll(this.expenseRows, true)];
  }

  private collapseExpandAll(items, isExpanded: boolean) {
    for (let index = 0; index < (items || []).length; index++) {
      items[index].expanded = isExpanded;
      if ((items[index].children || []).length > 0)
        this.collapseExpandAll(items[index].children, isExpanded);
    }
    return items;
  }

  private getProjectDetailsByGuid() {
    if (this.currentProjectGuid && this.currentProjectGuid.length > 0) {
      this.projectService.getProjectByGuid(this.currentProjectGuid).then(success => {
        this.currentProject = success;
      }, () => {
      });
    }

  }

  ngOnDestroy(): void {
    if (this.routerParamsSubscription) {
      this.routerParamsSubscription.unsubscribe();
    }
  }

  toggleRows(event: MouseEvent) {
    this.isAllRowsExpanded = !this.isAllRowsExpanded;
    this.expenseRows = [...this.collapseExpandAll(this.expenseRows, this.isAllRowsExpanded)];
  }
}
