export class TableColumnDefinition {
  columnHeading: string;
  dataType: string;
  dbColumnName: string;
  id: string;
  iconClass?: string;
  styleClass?: string;

  constructor(values: Object = null) {
    if (values) {
      this.columnHeading = values["columnHeading"];
      this.dataType = values["dataType"];
      this.id = values["id"];
      this.dbColumnName = values["dbColumnName"];
      this.iconClass = values["iconClass"];
      this.styleClass = values["styleClass"];
    }
  }
}
