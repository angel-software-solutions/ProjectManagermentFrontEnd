import {Component, OnInit} from '@angular/core';
import {TableColumnDefinition} from "../../models/table-column-definition";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
  public pageTitle: string = 'Projects';
  pageColumns: Array<TableColumnDefinition> = [];

  constructor() {
    this.pageColumns.push({columnHeading: "Number", dataType: "string", dbColumnName: "Number", id: "number"});
    this.pageColumns.push({columnHeading: "Description", dataType: "string", dbColumnName: "Description", id: "description"});
  }

  ngOnInit() {
  }

}
