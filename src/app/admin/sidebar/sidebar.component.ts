import { Component, OnInit } from '@angular/core';

// Constants
import { STRINGS, LINKS } from './sidebar.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  strings = STRINGS;
  links = LINKS;
  lng = 'US';

  constructor() { }

  ngOnInit() {
  }

}
