import { Component, OnInit } from '@angular/core';
import { STRINGS } from './dashboard.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  strings = STRINGS;
  lng = 'US';

  constructor() { }

  ngOnInit() {
  }

}
