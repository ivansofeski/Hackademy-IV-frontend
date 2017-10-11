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
  functions: Functions = new Functions();
  mediaChanged = this.functions.mediaChanged;
  toggleSidebar = this.functions.toggleSidebar;
  toggle = this.functions.toggle;

  constructor() { }

  ngOnInit() {
    if (matchMedia) {
      const mq = matchMedia('(max-width: 1366px)');

      mq['eventName'] = this.listItemEventName;
      mq.addListener(this.mediaChanged);
      this.mediaChanged(mq);
    }
  }

}

// Exported all custom-tailored functions into a class named "Functions"
// So that is better readable, easier to access and to group up
// Provides less Component Class polluting (instead of having all functions in the same class we instatiate them from another).
export class Functions {
  // Function that detects window.matchMedia changes and evaluates them to true or false
  // We want to add a JavaScript event listener to each list item on the sidebar.
  // To do that, we check the required media query if it's the right one.
  // If YES, we add an event listener with paramaterized event name defined as class property => "listItemEventName"
  // If NO, we remove the same event listener that we provided earlier.
  mediaChanged(media) {
    const allItems = Array.from(document.querySelectorAll('li.item'));
    const eventName = media.eventName ? media.eventName : media.currentTarget.eventName;

    if (allItems !== undefined && allItems.length > 0) {
      for (const item of allItems) {
        media.matches ?
          item.addEventListener(eventName, this.toggle) :
          item.removeEventListener(eventName, this.toggle);
      }
    }
  }

  // Function that toggles the sidebar slide-in/slide-out visual effect with an overlay on the main-panel.
  // To do that, we add another class name to the whole wrapper and then set CSS rules to it's corresponding css file.
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

  // Function that toggles CSS rules to the list items on the sidebar.
  // Accepts only the triggering/firing HTML Element ("li") and depending on it's classList evaluates different result(s).
  toggle(evt: Event): EventListener {
    if (evt === undefined) {
      return;
    }

    // toggler: Since TypeScript doesn't recognize "currentTarget" as a HTML Element from the evt (type of Event)
    // we then must cast it (strong-type) to HTMLElement in order to have access to it's known properties.
    const toggler = <HTMLElement>evt.currentTarget;
    const container = toggler.parentElement;
    let lastSelectedItem;
    let classes;

    switch (true) {
      case toggler.classList.contains('hasItems'):
        // This is where we set values for "ul.item-list > li.item.hasItems" (nested item),
        // so that we evaluate further down.
        classes = {
          container: 'item-list',
          query: '.item.expanded',
          toToggle: 'expanded'
        };
        break;
        // This is where we set values for "ul.item-list.sub > li.item" (sub-item),
        // so that we evaluate further down.
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

    // We want to set "classes" as an Object item which has exactly 3 properties
    // in order to distinguish nested item vs. normal/sub item
    // so that we can apply different CSS rules or do other stuff later on.
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

    // Since there are nested elements of "li" and both parent and child trigger this function,
    // we have to stop propagation/delegation to not trigger both at the same time.
    // To do that we use/implement "stopPropagation", "preventDefault" pre-defined methods of JavaScript events.
    evt.preventDefault();
    evt.stopPropagation();
  }
}
