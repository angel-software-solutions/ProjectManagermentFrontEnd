import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TableColumnDefinition } from "../../models/table-column-definition";

@Component({
  selector: "app-common-data-grid",
  templateUrl: "./common-data-grid.component.html",
  styleUrls: ["./common-data-grid.component.sass"]
})
export class CommonDataGridComponent implements OnInit {
  @Input("table-columns") tableHeaderColumns: Array<TableColumnDefinition> = [];
  @Input("table-action-columns") tableActionColumns: Array<
    TableColumnDefinition
  > = [];
  @Input("table-data") tableRenderingData: Array<any> = [];

  @Output("on-event-performed") onEventPerformed: EventEmitter<
    any
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public OnActionButtonClicked(event, button, rowItem) {
    console.info("OnActionButtonClicked", button);
    this.onEventPerformed.emit({
      event: event,
      actionButton: button,
      rowItem: rowItem
    });
  }
}
