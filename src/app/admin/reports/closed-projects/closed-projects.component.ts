// Modules
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material';
import '../../../shared/rxjs.operators';

// Interfaces
import { Project } from '../../../interfaces/project';

// Services
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-closed-projects',
  templateUrl: './closed-projects.component.html',
  styleUrls: ['./closed-projects.component.scss']
})

export class ClosedProjectsComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  years: string[] = [];
  yearNow = new Date().getFullYear();
  selectedMonth: any;
  chosenMonth: any = '';
  chosenYear: any = '';
  errors: any[] = [];
  dataSource: ProjectDataSource | null;
  displayedColumns = ['id', 'projectName', 'orgName', 'bankAccount', 'fundsRaised', 'dueDate'];
  months = [
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
  @ViewChild(MatSort) sort: MatSort;

  yearsGenerator: Function = (): void => {
    const year = new Date;
    const yearNow = year.getFullYear();

    for (let i = yearNow; i >= 2000; i--) {
      this.years.push(i.toString());
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

    this.initDataSource(fullPeriod);
  }

  resetFilters: Function = (yearsSelect, monthsSelect): void => {
    if (!yearsSelect || !monthsSelect) {
      return;
    }

    yearsSelect.value = undefined;
    monthsSelect.value = undefined;

    if (this.initDataSource) {
      this.initDataSource();
    }
  }

  initDataSource: Function = (filter?: string): void => {
    this.dataSource = new ProjectDataSource(this._dataService, this.sort, filter);
  }

  ngOnInit() {
    this.yearsGenerator();
    this.initDataSource();
  }

  constructor(private _dataService: DataService, private _router: Router) {
  }
}

export class ProjectDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  errors: any[] = [];

  private subject: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  connect(): Observable<Project[]> {

    const displayDataChanges = [
      this.subject,
      this._sorter.sortChange
    ];

    if (!this.subject.isStopped) {
      this.dataService.getProjects().subscribe(
        projects => {
          const _today = new Date();

          if (this.dataService.getOrganizations) {
            this.dataService.getOrganizations().subscribe(
              orgs => {
                const _closed = projects.filter((proj, i, obj) => {
                  proj['organization'] = orgs.filter((org, j) => {
                    return org.organizationId = proj.organizationId;
                  })[0];

                  if (proj.hasOwnProperty('raisedFunding') && proj.hasOwnProperty('amountToBeRaised') && proj.hasOwnProperty('toDate')) {
                    const _projToDate = new Date(+proj.toDate);

                    if (_projToDate < _today || proj.raisedFunding === proj.amountToBeRaised) {
                      if (this.filter && typeof this.filter === 'string' && this.filter.trim().length > 0) {
                        const _toDate = new Date(+proj.toDate).toISOString().split('T')[0].slice(0, -2).replace(/-/g, '/');

                        if (_toDate.indexOf(this.filter) > -1) {
                          return proj;
                        }
                      } else {
                        return proj;
                      }
                    }
                  }
                });

                this.subject.next(_closed && _closed.length > 0 ? _closed : []);
              },
              error => this.errors.push(error)
            );
          }
        },
        error => this.errors.push(error)
      );

      return Observable.merge(...displayDataChanges).map(() => {
        return this.getSortedData();
      });
    }
  }

  disconnect() {
    this.subject.complete();
    this.subject.observers = [];
    console.log('disconnected!');
  }

  getSortedData(): Project[] {
    const data = this.subject.value.slice();

    if (!this._sorter.active || this._sorter.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string | Date = '';
      let propertyB: number | string | Date = '';

      switch (this._sorter.active) {
        case 'id':          [propertyA, propertyB] = [a.projectName, b.projectName]; break;
        case 'title':       [propertyA, propertyB] = [a.projectName, b.projectName]; break;
        case 'orgName':     [propertyA, propertyB] = [a['organization'].name, b['organization'].name]; break;
        case 'bankAccount': [propertyA, propertyB] = [a['organization'].billing, b['organization'].billing]; break;
        case 'fundsRaised': [propertyA, propertyB] = [a.raisedFunding, b.raisedFunding]; break;
        case 'dueDate':     [propertyA, propertyB] = [a.toDate, b.toDate]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sorter.direction === 'asc' ? 1 : -1);
    });
  }

  constructor(private dataService: DataService, private _sorter: MatSort, private filter?: string) {
    super();
  }
}
