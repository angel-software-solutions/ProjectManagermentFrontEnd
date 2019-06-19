import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-row-view',
  template: '<div class="row"><app-cell-view [columns]="tableHeaders"></app-cell-view></div> ',
  /*+
    '<div *ngFor="let row of tableRows" class="row">' +
    '<app-cell-view [columns]="row.cols"></app-cell-view>' +
    '</div>',*/
})
export class TableRowElementComponent implements OnInit {
  @Input('rows') tableRows;
  @Input('displayData') tableData;
  @Input('tableHeaders') tableHeaders;

  constructor() {
  }

  ngOnInit(): void {
  }
}
