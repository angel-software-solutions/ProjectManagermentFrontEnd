import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AutoCompleteService} from "../../services/auto-complete.service";

@Component({
  selector: 'app-auto-complete',
  templateUrl: './app-auto-complete.component.html',
  styleUrls: ['./app-auto-complete.component.sass']
})
export class AppAutoCompleteComponent implements OnInit {
  @Output('on-query-changed') onQueryChanged = new EventEmitter();
  @Output('on-item-selected') onItemSelected = new EventEmitter();
  @Output('on-focus') onInputFocus = new EventEmitter();
  @Input('autoCompleteDataList') autoCompleteDataList: Array<any>;
  @Input('input-label') inputLabel: string;
  @Input('dropdown-list-property') dropdownListProperty: string;
  @Input('dropdown-list-secondary-property') dropdownListSecondaryProperty: string;
  @Input('apiCallback') apiCallbackFunc: Function;
  @Input('search-keyword') autoCompleteSearchQuery: string;
  @Input('inline-input') inlineInput: boolean = false;

  constructor(private autoCompleteService: AutoCompleteService) {
  }

  ngOnInit() {
  }

  onAutoCompleteItemSelected(event: Event) {
    this.onItemSelected.emit({event: event, selectedItem: null});
  }

  onAutoCompleteSearchQueryChanged(event: Event) {
    this.onQueryChanged.emit({event: event, query: this.autoCompleteSearchQuery});
    /*console.info('onAutoCompleteSearchQueryChanged', event);
    let searchObject = {
      searchTerm: event,
    };
    console.info("searchObject", searchObject);

    if (this.apiCallbackFunc && typeof this.apiCallbackFunc === "function") {
      this.apiCallbackFunc(event).then(success => {
        // this.autoCompleteDataList = [...success];
      }, error => {
        console.error(error);
      });
    } else {
      console.error('apiCallback must be defined and a Function to get list of entities');
      throw Error('apiCallback must be defined and a Function to get list of entities');
    }*/
  }

  onInputFocusEventFired(event) {
    this.onInputFocus.emit(event);
  }
}
