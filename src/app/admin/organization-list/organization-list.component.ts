import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { DataSource } from '@angular/cdk/collections';
import { MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})

export class OrganizationListComponent implements OnInit, OnDestroy {

  errors: any[] = [];
  orgList: any[] = [];

  // Constructor here
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.loadData.organizations().subscribe(
      res => {
        // console.log(res);
        this.orgList = res;
      },
      error => this.errors.push(error)
    );
  }

  ngOnDestroy(): void { }

}
