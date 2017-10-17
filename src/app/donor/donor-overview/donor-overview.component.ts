import { Component, OnInit } from '@angular/core';
import {DonorOverviewService} from './donor-overview.service';
import {Donor} from '../donor.interface';
import {ProjectService} from '../../projects/project.service';
import {LocalStorageService} from '../../service/local-storage.service';

@Component({
  selector: 'app-donor-overview',
  templateUrl: './donor-overview.component.html',
  styleUrls: ['./donor-overview.component.scss']
})
export class DonorOverviewComponent implements OnInit {
  currentUser: any = {};
  errors: any[] = [];
  donorList: any[] = [];
  donor: Donor;
  projectList: any[] = [];

  constructor(private _donorList: DonorOverviewService,
              private _localStorageService: LocalStorageService,
              private _projectService: ProjectService) { }

  ngOnInit() {
    this.currentUser = this._localStorageService.getCurrentUser();

    this._donorList.getDonors().subscribe(
      res => {
        console.log(res);
        this.donorList = res;
        this.donor = res[0];
        console.log(this.donor);
      },
      error => this.errors.push(error)
    );

    this._projectService.getTargettedProjects(this.currentUser.savedProject).subscribe(
      res => {
        console.log(res);
        this.projectList = res;
      }
    );
  }

}
