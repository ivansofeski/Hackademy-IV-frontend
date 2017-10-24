import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../shared/rxjs.operators';

// Services
import { DataService } from '../../../shared/services/data.service';

// Interfaces
import { Project } from '../../../interfaces/project';

@Component({
  selector: 'app-closed-projects',
  templateUrl: './closed-projects.component.html',
  styleUrls: ['./closed-projects.component.scss']
})

export class ClosedProjectsComponent implements OnInit {
  /**
   * @readonly An Object type property. Basically, it provides column labels and their
   * respective shown values (strings) on runtime. It's a required property in order to let Table Child Component be created.
   * @prop `columns.all`
   * an Array of all possible columns of the table data we are supposed to fetch and load.
   * @prop `columns.visible`
   * an Array of selected columns to be shown in the Table Child Component.
   */
  readonly columns = {
    all: [
      { label: 'order', value: '#' },
      { label: 'projectName', value: 'title' },
      { label: 'projectId', value: 'proj. ID' },
      { label: 'projectManager', value: 'manager' },
      { label: 'fromDate', value: 'start (date)' },
      { label: 'toDate', value: 'closed (date)' },
      { label: 'address', value: 'address' },
      { label: 'location', value: 'geolocation' },
      { label: 'neededFunding', value: 'funding goal' },
      { label: 'raisedFunding', value: 'collected amount' },
      { label: 'description', value: 'description' },
      { label: 'mainImage', value: 'logo' },
      { label: 'images', value: 'gallery' },
      { label: 'organizationName', value: 'org. name' },
      { label: 'organizationId', value: 'org. ID' },
      { label: 'open', value: 'active' },
      { label: 'bankAccount', value: 'bank account' }
    ],
    visible: ['order', 'projectName', 'organizationName', 'bankAccount', 'raisedFunding', 'toDate']
  };

  /**
   * @property The table data for the component itself. It's strong-typed to `Organization` interface and is predefined
   * as an empty array of `Organization`. Later on, it's value changes when we subscribe to an Observable method from
   * the service associated with this component.
   *
   * The property name is reflected as an `Input()` on the Table Child Compoment so it's recommended not to change it.
   */
  public tableData: Project[] = [];
  /**
   * @property An empty Array of `any` type. It stands to collect garbabe possible/unpredictable errors in the component.
   */
  public errors: any[] = [];

  /**
   * @property Function to initialize starting code for the component itself.
   * It consists of many steps like subscribing to a method in the service instantiated by the contructor
   * and then process it's result further.
   *
   * `filter` Optional argument. Whenever user sets a period of time from both Date Pickers it will trigger a filtering on the table data
   * source. This `filter` is type of string when initiated.
   */
  initDataLoad: Function = (filterDate?: string): void => {
    if (this._dataService) {
      this._dataService.getProjects().subscribe(
        projects => {
          if (projects && projects.length > 0) {
            this._dataService.getOrganizations().subscribe(
              organizations => {
                if (organizations && organizations.length > 0) {
                  projects.forEach((v, i) => {
                    const org = organizations.filter((y, j) => {
                      const name = y.name;

                      if (y.id === v.organizationId) {
                        return name;
                      }
                    })[0];

                    v.organizationName = org && org.name ? org.name : '';
                    v['bankAccount'] = org && org.billing ? org.billing : '';
                  });

                  this.tableData = filterDate && filterDate.length > 0 ? projects.filter((v, i) => {
                    const _filteredDate = new Date(filterDate);
                    const _projectToDate = new Date(v.toDate);
                    return
                  }) : projects;
                }
              }
            );
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