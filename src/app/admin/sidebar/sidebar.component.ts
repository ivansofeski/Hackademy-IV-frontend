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

  toggleSidebar(toggler: HTMLElement): void {
    if (toggler === undefined) {
      return;
    }

    const sidebar = toggler.parentElement;
    const mainPanel = toggler.parentElement.nextElementSibling;

    if (sidebar !== undefined && mainPanel !== undefined && mainPanel.classList.contains('main-panel')) {
      sidebar.classList.toggle('expanded');
      mainPanel.classList.toggle('expanded');
      toggler.classList.toggle('expanded');

      console.log(toggler.parentElement.classList);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
