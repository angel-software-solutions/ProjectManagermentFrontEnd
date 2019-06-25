import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.sass"]
})
export class DropdownComponent implements OnInit {
  constructor() {}

  @Input() inputName: string;
  @Input() itemSource: any;
  @Input() valueModel: any;
  @Input() displayMember: string;
  @Input() valueMember: string;

  @Output() valueModelChange = new EventEmitter<any>();

  ngOnInit() {}
  onSelectionChange(event) {
    
    this.valueModelChange.emit(event.value[this.valueMember]);
  }
}
