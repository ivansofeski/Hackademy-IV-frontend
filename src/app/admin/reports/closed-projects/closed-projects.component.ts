// Modules
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../../shared/rxjs.operators';

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
  readonly months = [
    { value: '01', viewValue: 'January' },
    { value: '02', viewValue: 'February' },
    { value: '03', viewValue: 'March' },
    { value: '04', viewValue: 'April' },
    { value: '05', viewValue: 'May' },
    { value: '06', viewValue: 'June' },
    { value: '07', viewValue: 'July' },
    { value: '08', viewValue: 'August' },
    { value: '09', viewValue: 'September' },
    { value: '10', viewValue: 'October' },
    { value: '11', viewValue: 'November' },
    { value: '12', viewValue: 'December' },
  ];
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
      { label: 'amountToBeRaised',                value: 'needed amount' },
      { label: 'raisedFunding',                   value: 'collected amount' },
      { label: 'description',                     value: 'description' },
      { label: 'mainImage',                       value: 'logo' },
      { label: 'images',                          value: 'gallery' },
      { label: 'projectManager',                  value: 'manager' },
      { label: 'nationalProject',                 value: 'national' },
      { label: 'recurringProject',                value: 'recurring' },
      { label: 'recurringProjectPublishingDate',  value: 'published on' },
      { label: 'organizationName',                value: 'organization' },
      { label: 'bankAccount',                     value: 'bank account' }
    ],
    visible: ['id', 'projectName', 'organizationName', 'bankAccount', 'raisedFunding', 'toDate']
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

  years: number[] = [];
  chosenYear: number;
  chosenMonth: number;

  yearsGenerator: Function = (): void => {
    const yearNow = new Date().getFullYear();

    for (let i = yearNow; i >= 2000; i--) {
      this.years.push(i);
    }
  }

  filterClosedProjects: Function = (date: Object): void => {
    if (date === undefined || typeof date !== 'object') {
      return;
    }

    if (Object.keys(date).length > 0) {
      for (const key in date) {
        if (date.hasOwnProperty(key)) {
          this[key] = date[key];
        }
      }
    }

    const fullPeriod = `${this.chosenYear}/${this.chosenMonth}`;

    this.initDataLoad(new Date(fullPeriod));
  }

  resetFilters: Function = (yearsSelect, monthsSelect): void => {
    if (!yearsSelect || !monthsSelect) {
      return;
    }

    yearsSelect.value = undefined;
    monthsSelect.value = undefined;

    if (this.initDataLoad) {
      this.initDataLoad();
    }
  }

  /**
   * @property Function to initialize starting code for the component itself.
   * It consists of many steps like subscribing to a method in the service instantiated by the contructor
   * and then process it's result further.
   *
   * `filter` Optional argument. Whenever user sets a period of time from both Date Pickers it will trigger a filtering on the table data
   * source. This `filter` is type of string when initiated.
   */
  initDataLoad: Function = (filterDate?: Date | string): void => {
    if (this._dataService) {
      this._dataService.getProjects().subscribe(
        projects => {
          if (projects && projects.length > 0) {
            this._dataService.getOrganizations().subscribe(
              organizations => {
                if (organizations && organizations.length > 0) {
                  projects.forEach((proj, index, obj) => {
                    const _dateNow: Date = new Date();
                    const _projectToDate: Date = new Date(+proj.toDate);
                    const _closedByDate = _projectToDate <= _dateNow;
                    const _closedByFunding = proj.amountToBeRaised && proj.raisedFunding &&
                      proj.raisedFunding === proj.amountToBeRaised ? true : false;
                    const _org = organizations.filter((org, j) => {
                      return org.organizationId && proj.organizationId && org.organizationId === proj.organizationId;
                    })[0];

                    proj['organizationName']  = _org.name           ? _org.name : '';
                    proj['bankAccount']       = _org.accountNumber  ? _org.accountNumber : '';

                    let _validate = false;

                    if (_closedByDate || _closedByFunding) {
                      _validate = true;
                    }

                    if (filterDate) {
                      _validate = (filterDate <= _dateNow && filterDate <= _projectToDate) &&
                        (proj.toDate.toString().trim().slice(0, -2).indexOf(filterDate.toString()) > -1);
                    }

                    if (_validate) {
                      this.tableData.push(proj);
                    }

                    delete proj.organizationId;
                  });
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
    if (this.yearsGenerator) {
      this.yearsGenerator();
    }

    if (this.initDataLoad) {
      this.initDataLoad();
    }
  }

  constructor(private _dataService: DataService) { }
}
