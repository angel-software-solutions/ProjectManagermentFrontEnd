import {Injectable} from '@angular/core';
import {ProjectsService} from "./projects.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectExpenseHelperService {

  constructor(private projectService: ProjectsService) {
  }

  public getStaticData() {
    return [
      {
        "data": {
          "name": "Documents",
          "size": "75kb",
          "type": "Folder"
        },
        "children": [
          {
            "data": {
              "name": "Work",
              "size": "55kb",
              "type": "Folder"
            },
            "children": [
              {
                "data": {
                  "name": "Expenses.doc",
                  "size": "30kb",
                  "type": "Document"
                }
              },
              {
                "data": {
                  "name": "Resume.doc",
                  "size": "25kb",
                  "type": "Resume"
                }
              }
            ]
          },
          {
            "data": {
              "name": "Home",
              "size": "20kb",
              "type": "Folder"
            },
            "children": [
              {
                "data": {
                  "name": "Invoices",
                  "size": "20kb",
                  "type": "Text"
                }
              }
            ]
          }
        ]
      },
      {
        "data": {
          "name": "Pictures",
          "size": "150kb",
          "type": "Folder"
        },
        "children": [
          {
            "data": {
              "name": "barcelona.jpg",
              "size": "90kb",
              "type": "Picture"
            }
          },
          {
            "data": {
              "name": "primeui.png",
              "size": "30kb",
              "type": "Picture"
            }
          },
          {
            "data": {
              "name": "optimus.jpg",
              "size": "30kb",
              "type": "Picture"
            }
          }
        ]
      }
    ];
  }

  public getAllExpenseData(currentProjectGuid: string) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.projectService.getProjectByGuid(currentProjectGuid),
        this.projectService.getProjectExpenseByProjectGuid(currentProjectGuid),
        this.projectService.getProjectRolesByProjectGuid(currentProjectGuid),
      ])
        .then((success: any) => {
          console.info(success);
          resolve({projectModel: success[0], expenseRows: this.processProjectExpenseData(success[1]), projectRoles: success[2]});
        }, error => {
          reject(error);
        });
    });

  }

  private processProjectExpenseData(expenseData: Array<any>) {
    let processedData = [];
    expenseData.forEach(expenseItem => {
      let processedParentItem = {data: {}, children: []};
      expenseItem.allocation = {};
      Object.assign(processedParentItem['data'], {description: expenseItem.description, scopeName: expenseItem.scopeName, payrollType: expenseItem.payrollType, status: expenseItem.status});
      processedParentItem['children'] = [];
      if ((expenseItem.childTasks || []).length > 0) {
        let parentItemTotalHours = {};
        let parentItemRowCost = 0;
        (expenseItem.childTasks || []).forEach(taskItem => {
          let processedTaskItem = {data: {}, children: []};
          Object.assign(processedTaskItem['data'], {description: taskItem.description, scopeName: taskItem.scopeName, payrollType: taskItem.payrollType, status: taskItem.status});
          if ((taskItem.Allocations || []).length > 0) {
            let totalHours = 0;
            let rowCost = 0;
            (taskItem.Allocations || []).forEach(allocationItem => {
              if (allocationItem.projectRoleGuid) {
                processedTaskItem.data[allocationItem.projectRoleGuid] = allocationItem.estimateHours;
                totalHours += allocationItem.estimateHours;

                if (!parentItemTotalHours[allocationItem.projectRoleGuid]) parentItemTotalHours[allocationItem.projectRoleGuid] = 0;
                parentItemTotalHours[allocationItem.projectRoleGuid] += (allocationItem.estimateHours || 0);
              }
              rowCost += (allocationItem.roleRate || 1) * (allocationItem.estimateHours || 1);
            });
            processedTaskItem.data['totalHours'] = (totalHours > 0) ? totalHours : null;
            processedTaskItem.data['rowCost'] = rowCost;
            parentItemRowCost += rowCost;
          }
          processedParentItem.children.push(processedTaskItem);
        });
        let parentItemTotalHoursKeys = Object.keys(parentItemTotalHours);
        let totalParentItemHours = 0;
        parentItemTotalHoursKeys.forEach(key => {
          processedParentItem.data[key] = parentItemTotalHours[key];
          totalParentItemHours += parentItemTotalHours[key];
        });
        processedParentItem.data['totalHours'] = (totalParentItemHours > 0) ? totalParentItemHours : null;
        processedParentItem.data['rowCost'] = parentItemRowCost;
      }
      processedData.push(processedParentItem);
    });
    return processedData;
  }

}
