import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fab-toggle',
  template: `
    <a
      class="fab-toggle"
      (click)="onClick.emit($event)">
      <span
        [class]="'icon-' + icon">
      </span>
      <ng-content></ng-content>
    </a>
  `
})
export class FabToggle {
  @Input() icon;
  @Output() onClick = new EventEmitter();
}