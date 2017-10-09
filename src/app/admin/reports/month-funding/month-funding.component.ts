import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-month-funding',
  templateUrl: './month-funding.component.html',
  styleUrls: ['./month-funding.component.scss']
})
export class MonthFundingComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  proList: any[];
  projectId: number = 0;
  project: any;
  errors: any[] = [];

  constructor(public route: ActivatedRoute, public router: Router,private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProjects().subscribe(
      res => {
        //console.log(res);
        this.proList = res
      },
      error => this.errors.push(error)
    );
  }

}
