import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../interface/project';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

// Components
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit {
  @ViewChild(TableComponent) table;
  columns = {
    all: [
      { label: 'order',             value: '#' },
      { label: 'projectName',       value: 'title' },
      { label: 'projectId',         value: 'proj. ID' },
      { label: 'projectManager',    value: 'manager' },
      { label: 'fromDate',          value: 'start (date)' },
      { label: 'toDate',            value: 'end (date)' },
      { label: 'address',           value: 'address' },
      { label: 'location',          value: 'geolocation' },
      { label: 'neededFunding',     value: 'funding goal' },
      { label: 'raisedFunding',     value: 'funding reached' },
      { label: 'description',       value: 'description' },
      { label: 'mainImage',         value: 'logo' },
      { label: 'images',            value: 'gallery' },
      { label: 'organizationName',  value: 'org. name' },
      { label: 'organizationId',    value: 'org. ID' },
      { label: 'open',              value: 'active' }
    ],
    visible: ['order', 'mainImage', 'projectName', 'projectId', 'projectManager', 'address']
  };
  tableData: Project[] = [];
  errors: any[] = [];
  componentData = null;

  initDataLoad: Function = (): void => {
    if (this._dataService) {
      this._dataService.getProjects().subscribe(
        projects => {
          if (projects && projects.length > 0) {
            this.tableData = projects;
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

  constructor(private _dataService: DataService) { }
}
