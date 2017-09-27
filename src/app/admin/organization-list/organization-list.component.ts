import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit, OnDestroy {

  errorMessage: string;
  fetchedData: any[];
  organizationsFilePath = '../../../assets/mockdata/organizations.json';

  // Constructor here
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.get(this.organizationsFilePath)
      .subscribe(
      res => {
        this.fetchedData = res;
        console.log(this.fetchedData);
      },
      error => this.errorMessage = <any>error);
  }

  ngOnDestroy(): void {}

}
