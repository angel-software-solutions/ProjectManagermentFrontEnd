import { Component, OnInit } from "@angular/core";
import { TableColumnDefinition } from "../../models/table-column-definition";
import { Router } from "@angular/router";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.sass"]
})
export class ProjectsComponent implements OnInit {
  public pageTitle: string = "Projects";
  pageColumns: Array<TableColumnDefinition> = [];

  constructor(private router: Router) {
    this.pageColumns.push({
      columnHeading: "Number",
      dataType: "string",
      dbColumnName: "Number",
      id: "number"
    });
    this.pageColumns.push({
      columnHeading: "Description",
      dataType: "string",
      dbColumnName: "Description",
      id: "description"
    });
  }

  ngOnInit() {}
  onCreateProject() {
    this.router.navigate(["projects", "new"]);
  }
}
