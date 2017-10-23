import { Component, OnInit } from '@angular/core';
// import {DonorOverviewService} from './donor-overview.service';

//Interfaces
import { Donor } from '../../interfaces/donor';

//Services
import {LocalStorageService} from '../../service/local-storage.service';
import { DataService } from '../../shared/services/data.service';

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

  constructor(private _localStorageService: LocalStorageService,
              private _dataService: DataService) { }

  ngOnInit() {
    this.donor = this._localStorageService.getCurrentUser();

    this._dataService.getProjects().subscribe(
      res => {
        console.log(res);
        this.projectList = res.filter((k, v) => {
          for (const id of this.donor.savedProject) {
            if (k.id === id) {
              return true;
            }
          }
        });
        console.log(this.projectList);
      });
  }
}
