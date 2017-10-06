import { Component, OnInit } from '@angular/core';
import {DonorOverviewService} from './donor-overview.service';
import {Donor} from '../donor.interface';
import {ProjectService} from '../../projects/project.service';

@Component({
  selector: 'app-donor-overview',
  templateUrl: './donor-overview.component.html',
  styleUrls: ['./donor-overview.component.scss']
})
export class DonorOverviewComponent implements OnInit {
  errors: any[] = [];
  donorList: any[] = [];
  donor: Donor;
  projectList: any[] = [];

  constructor(private _donorList: DonorOverviewService, private _projectService: ProjectService) { }

  ngOnInit() {
    this._donorList.getDonors().subscribe(
      res => {
        console.log(res);
        this.donorList = res;
        this.donor = res[0];
        console.log(this.donor);
      },
      error => this.errors.push(error)
    );

    this._projectService.getProjects().subscribe(
      res => {
        console.log(res);
        this.projectList = res;
      },
      error => this.errors.push(error)
    );
  }

}
