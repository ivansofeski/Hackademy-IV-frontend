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
  listItemEventName = 'touchend';

  mediaChanged(mq) {
    const allItems = Array.from(document.querySelectorAll('li.item'));

    if (allItems !== undefined && allItems.length > 0) {
      for (const item of allItems) {
        mq.matches ?
          item.addEventListener(this.listItemEventName, this.toggle) :
          item.removeEventListener(this.listItemEventName, this.toggle);
      }
    }
  }

  toggleSidebar(toggler: HTMLElement): void {
    if (toggler === undefined) {
      return;
    }

    const wrapper = toggler.parentElement.parentElement;
    const sidebar = toggler.parentElement;
    const mainPanel = toggler.parentElement.nextElementSibling;

    if (wrapper !== undefined && wrapper.classList.contains('wrapper')) {
      wrapper.classList.toggle('expanded');
    }
  }

  toggle(evt: Event): EventListener {
    if (evt === undefined) {
      return;
    }

    const toggler = <HTMLElement>evt.currentTarget;
    const container = toggler.parentElement;
    let lastSelectedItem;
    let classes;

    switch (true) {
      case toggler.classList.contains('hasItems'):
        classes = {
          container: 'item-list',
          query: '.item.expanded',
          toToggle: 'expanded'
        };
        break;
      case !toggler.classList.contains('hasItems'):
        classes = {
          container: 'sub',
          query: '.item.selected',
          toToggle: 'selected'
        };
        break;
      default:
        break;
    }

    if (classes !== undefined && Object.keys(classes).length === 3) {
      if (container !== undefined && container.classList.contains(classes.container)) {
        lastSelectedItem = container.querySelectorAll(classes.query)[0];

        if (lastSelectedItem !== undefined && lastSelectedItem.classList.contains(classes.toToggle)) {
          lastSelectedItem.classList.remove(classes.toToggle);
        }

        if (lastSelectedItem !== undefined && lastSelectedItem === toggler) {
          if (classes.toToggle !== undefined) {
            toggler.classList.remove(classes.toToggle);
          }
        } else {
          if (classes.toToggle !== undefined) {
            toggler.classList.add(classes.toToggle);
          }
        }
      }
    }

    evt.stopPropagation();
  }

  constructor() { }

  ngOnInit() {

    if (matchMedia) {
      const mq = matchMedia('(max-width: 1366px)');
      mq.addListener(this.mediaChanged);
      this.mediaChanged(mq);
    }
  }

}
