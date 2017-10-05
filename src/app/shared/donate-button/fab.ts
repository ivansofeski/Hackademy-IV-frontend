import {
    Component, Input, ContentChildren, ContentChild, ElementRef, HostListener, Directive
} from '@angular/core';

import { FabToggle } from './fab-toggle';
import { FabButton } from './fab-button';


@Component({
  selector: 'fab',
  styleUrls: ['./donate-button.component.scss'],
  template: `
    <div
      class="fab-menu"
      [class.active]="active">
      <ng-content></ng-content>
    </div>
  `
})
export class Fab {
    
  @Input() dir = 'up';
  @ContentChild(FabToggle) toggle;
  @ContentChildren(FabButton) buttons;
  _active=false;
  element;
  get active() {
    return this._active;
  }

  set active(val) {
    this.updateButtons(val);
    this._active = val;
  }

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngAfterContentInit() {
    this.toggle.onClick.subscribe(() => {
      this.active = !this.active;
    });
  }

  getTranslate(idx) {
    if(this.dir === 'up') {
      return `translate3d(8px,${ -45 * idx }px,0)`;
    } else {
      console.error(`Unsupported direction for the button; ${this.dir}`);
    }
  }

  updateButtons(active) {
    let idx = 1;
    
    for(let btn of this.buttons.toArray()) {
      let style = btn.element.nativeElement.style;
      style['transition-duration'] = active ? `${ 90 + (100 * idx) }ms` : '';
      style['transform'] = active ? this.getTranslate(idx) : '';
      idx++;
    }
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target) {
    if(this.active && !this.element.contains(target)) {
      this.active = false;
    }
  }

}

export const FAB_COMPONENTS = [
  FabToggle,
  FabButton,
  Fab
];
