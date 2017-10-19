import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';

// Interfaces
import { Organization } from '../interface/organization';

// Services
import { DataService } from '../services/data.service';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})

export class OrganizationListComponent implements OnInit {
  @ViewChild(TableComponent) table;
  columns = {
    all: [
      { label: 'order',         value: '#' },
      { label: 'orgId',         value: 'org. number' },
      { label: 'orgLogo',       value: 'logo' },
      { label: 'name',          value: 'name' },
      { label: 'address',       value: 'address' },
      { label: 'person',        value: 'contact person' },
      { label: 'phone',         value: 'contact phone' },
      { label: 'email',         value: 'contact email' },
      { label: 'description',   value: 'about' }
    ],
    visible: ['order', 'orgLogo', 'name', 'orgId', 'address', 'person', 'email']
  };
  tableData: Organization[] = [];
  errors: any[] = [];

  initDataLoad: Function = (): void => {
    if (this._dataService) {
      this._dataService.getOrganizations().subscribe(
        organizations => {
          if (organizations && organizations.length > 0) {
            this.tableData = organizations;
          }
        },
        error => this.errors.push(error)
      );
    }
  }

  ngOnInit() {
    if (this.initDataLoad) {
      this.initDataLoad();
    }
  }

  constructor(private _router: Router, private _dataService: DataService) { }
}
