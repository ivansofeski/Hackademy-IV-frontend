import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-donate-button',
  templateUrl:'./donate-button.component.html',
  styleUrls: ['./donate-button.component.scss'],
})

export class DonateButtonComponent implements OnInit {
  @Input() donateOption1;
  @Input() donateOption2;
  @Input() donateOption3;
  @Input() project;
  constructor() {
  }

  toggleAmounts(elm: HTMLElement): void {
    if (elm === undefined) {
      return;
    }

    elm.parentElement.classList.toggle('expanded');
    // console.log(elm.parentElement.classList);
  }

  ngOnInit() {
  }
  
  donate(amount:number){
      console.log('Something changed');
      // this.project.find(o => o.id === ID);
      if (this.project.raisedFunding+amount<=this.project.neededFunding){
        this.project.raisedFunding = this.project.raisedFunding+amount;
      }
      
  }
}

