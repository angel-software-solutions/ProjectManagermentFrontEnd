import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-cell-view',
  template: '<div *ngFor="let col of tableColumns" class="col">{{col.displayLabel}}</div>',
})
export class TableCellElementComponent implements OnInit {
  @Input('columns') tableColumns;

  constructor() {
  }

  ngOnInit(): void {
  }
}
