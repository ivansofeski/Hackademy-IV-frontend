import {  Component, OnInit,Input, ContentChildren, ContentChild, ElementRef, HostListener
} from '@angular/core';

import { FabToggle } from './fab-toggle';
import { FabButton } from './fab-button';

@Component({
  selector: 'app-donate-button',
  templateUrl:'./donate-button.component.html',
  styleUrls: ['./donate-button.component.scss'],
})

export class DonateButtonComponent implements OnInit {

  constructor() {
  }

  toggleAmounts(elm: HTMLElement): void {
    if (elm === undefined) {
      return;
    }

    elm.parentElement.classList.toggle('expanded');
    console.log(elm.parentElement.classList);
  }

  ngOnInit() {
  }
}

