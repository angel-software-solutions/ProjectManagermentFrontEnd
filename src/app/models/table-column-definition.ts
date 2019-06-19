export class TableColumnDefinition {
  columnHeading: string;
  dataType: string;
  dbColumnName: string;
  id: string;

  constructor(values: Object = null) {
    if (values) {
      this.columnHeading = values['columnHeading'];
      this.dataType = values['dataType'];
      this.id = values['id'];
      this.dbColumnName = values['dbColumnName'];
    }
  }
}
