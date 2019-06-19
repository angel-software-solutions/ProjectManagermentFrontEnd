import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal-dialog',
  templateUrl: './confirm-modal-dialog.component.html',
  styleUrls: ['./confirm-modal-dialog.component.sass']
})
export class ConfirmModalDialogComponent implements OnInit {
  @Input('modalHeading') modalHeading: string;
  @Input('modalBody') modalBody: string;

  constructor(public currentModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
