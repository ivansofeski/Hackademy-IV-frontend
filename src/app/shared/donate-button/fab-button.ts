import { 
    Component, 
    Input, 
    Output, 
    EventEmitter, 
    ViewChild 
  } from '@angular/core';
  
  @Component({
    selector: 'fab-button',
    template: `
      <a
        #anchor
        class="fab-item"
        (click)="onClick.emit($event)">
        <span line-hight="10px"
          [class]="'icon-' + icon">
        </span>
        <ng-content></ng-content>
      </a>
    `
  })
  export class FabButton {
    @Input() icon;
    @Output() onClick = new EventEmitter();
    @ViewChild('anchor') element;
  }