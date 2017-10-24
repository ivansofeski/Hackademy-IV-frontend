import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../shared/rxjs.operators';

// Interfaces
import { Project } from '../../interfaces/project';

// Services
import { DataService } from '../../shared/services/data.service';

// Components
import { TableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})

export class ProjectListComponent implements OnInit {
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
      { label: 'id',                              value: '#' },
      { label: 'projectNumber',                   value: 'project no.' },
      { label: 'projectName',                     value: 'project' },
      { label: 'address',                         value: 'address' },
      { label: 'fromDate',                        value: 'start (date)' },
      { label: 'toDate',                          value: 'closed (date)' },
      { label: 'longitude',                       value: 'longitude' },
      { label: 'latitude',                        value: 'latitude' },
      { label: 'amountToBeRaised',                value: 'goal (amount)' },
      { label: 'raisedFunding',                   value: 'collected amount' },
      { label: 'description',                     value: 'description' },
      { label: 'mainImage',                       value: 'logo' },
      { label: 'images',                          value: 'gallery' },
      { label: 'projectManager',                  value: 'manager' },
      { label: 'nationalProject',                 value: 'national' },
      { label: 'recurringProject',                value: 'recurring' },
      { label: 'recurringProjectPublishingDate',  value: 'published on' },
      { label: 'organizationId',                  value: 'organization id' }
    ],
    visible: ['id', 'projectNumber', 'projectName', 'address', 'amountToBeRaised', 'projectManager', 'toDate']
  };

  /**
   * @property The table data for the component itself. It's strong-typed to `Project` interface and is predefined
   * as an empty array of `Project`. Later on, it's value changes when we subscribe to an Observable method from
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
   */
  initDataLoad: Function = (): void => {
    if (this._dataService) {
      this._dataService.getProjects().subscribe(
        projects => {
          if (projects && projects.length > 0) {
            projects.forEach((proj, i, object) => {
              proj.fromDate = +proj.fromDate + (i * 86400000);
              proj.toDate = +proj.toDate + (i * 86400000);
            });

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
