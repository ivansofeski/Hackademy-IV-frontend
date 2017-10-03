import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {
  @Input() neededFunding: number ;
  @Input() raisedFunding: number ;


  constructor() { }

  ngOnInit() {
  }

}
