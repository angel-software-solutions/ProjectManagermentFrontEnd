import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {
  pageTitle: string = 'Tasks';

  constructor() {
  }

  ngOnInit() {
  }

}
