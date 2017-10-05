import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donor-overview',
  templateUrl: './donor-overview.component.html',
  styleUrls: ['./donor-overview.component.scss']
})
export class DonorOverviewComponent implements OnInit {

  projects: any[]= [
    {name: 'something'},
    {name: 'something'},
    {name: 'something'},
    {name: 'something'},
    {name: 'something'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
