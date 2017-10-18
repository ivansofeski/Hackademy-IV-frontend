import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss','./_progressbar.component-theme.scss']
})
export class ProgressbarComponent implements OnInit {
  @Input() neededFunding: number ;
  @Input() raisedFunding: number ;
  raised: number; 

  constructor() { }

  ngOnInit() {
    this.raised=(this.raisedFunding/this.neededFunding*100);
    
  }
  // onLiked(event){
  //   console.log(event)
  //   this.raised=(this.raisedFunding +event/this.neededFunding*100);
  // }

}
