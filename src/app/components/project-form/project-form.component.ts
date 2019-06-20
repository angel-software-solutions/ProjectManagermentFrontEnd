import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.sass']
})
export class ProjectFormComponent implements OnInit {
  selectedType: any;
  projectTypes: any;

  constructor() {
  }

  ngOnInit() {
  }

  onFormSubmit() {

  }
}
