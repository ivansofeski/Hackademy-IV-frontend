import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { Project } from '../../../interfaces/project';

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
  chosenMonth: any = "";
  chosenYear: any = "";
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

  // Constructor here
  constructor(private _dataService: DataService, private _router: Router) {
  }

  initDataSource: Function = (filter?: string): void => {
    this.dataSource = new ProjectDataSource(this._dataService, this.sort, filter);
  }

  ngOnInit() {
    this.yearsGenerator();
    this.initDataSource();
  }
  yearsGenerator(): void {
    let year = new Date;
    var yearNow = year.getFullYear();
    let years: any[] = [];

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

    console.log(fullPeriod);
  }
  ngOnDestroy(): void { }
  handleRowClick(row) {
    // alert('your click on the row with the Project  name ' + row.projectName);
    this._router.navigateByUrl('/admin/projects/view/' + row.id);
  }
}

export class ProjectDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  errors: any[] = [];
  nowDate = new Date;
  pla = this.nowDate.toDateString;
  constructor(private dataService: DataService, private _sorter: MatSort, private filter?: string) {
    super();
  }


  subject: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  connect(): Observable<Project[]> {

    const displayDataChanges = [
      this.subject,
      this._sorter.sortChange
    ];

    if (!this.subject.isStopped) {
      this.dataService.getProjects().subscribe(
        projects => {
          projects = projects.filter((k, v) => {
            let dateNow = k.toDate;
            return this.filter?
            dateNow <= this.nowDate && k.toDate.toString().trim().slice(0, -2).indexOf(this.filter) > -1 :
            dateNow <= this.nowDate;
          });

          this.dataService.getOrganizations().subscribe(
            orgs => {
              for (const proj of projects) {
                proj['organization'] = orgs.filter((v, k) => {
                  return v.id === proj.organizationId;
                })[0];

                delete proj.organizationId;
              }

              let _reorderedProj = [];

              for (let proj of projects) {
                proj.id = projects.indexOf(proj) + 1;
                _reorderedProj.push(proj)
              }

              this.subject.next(_reorderedProj);
            },
            error => this.errors.push(error)
          )
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
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sorter.active) {
        case 'id': [propertyA, propertyB] = [a.projectName, b.projectName]; break;
        case 'title': [propertyA, propertyB] = [a.projectName, b.projectName]; break;
        case 'orgName': [propertyA, propertyB] = [a['organization'].name, b['organization'].name]; break;
        case 'bankAccount': [propertyA, propertyB] = [a['organization'].billing, b['organization'].billing]; break;
        case 'fundsRaised': [propertyA, propertyB] = [a.raisedFunding, b.raisedFunding]; break;
//        case 'dueDate': [propertyA, propertyB] = [a.toDate, b.toDate]; break;
/*         case 'closedDate': [propertyA, propertyB] = [<string>a.closedDate, <string>b.closedDate]; break;
 */      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sorter.direction === 'asc' ? 1 : -1);
    });
  }
}
