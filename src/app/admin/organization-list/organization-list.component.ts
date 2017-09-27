import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})

export class OrganizationListComponent implements OnInit, OnDestroy {
  errorMessage: string;
  fetchedData: any;

  // Constructor here
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.fetchedData = this._dataService.get.organizations();
  }

  ngOnDestroy(): void { }

}
