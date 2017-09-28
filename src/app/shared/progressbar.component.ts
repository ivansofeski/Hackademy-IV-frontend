import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {
  @Input() neededFunding: number = 2000;
  @Input() raisedFunding: number = 1000;


  constructor() { }

  ngOnInit() {
  }

}
