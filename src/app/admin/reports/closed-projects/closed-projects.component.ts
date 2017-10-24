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

export class SomethingComponent implements OnInit {
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

  handleRowClick(row) {
    this._router.navigateByUrl('/admin/projects/view/' + row.id);
  }
}

export class ProjectDataSource extends DataSource<any> {
  errors: any[] = [];
  nowDate = new Date();
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
            let dateNow = new Date(k.toDate);
            return this.filter ? dateNow <= this.nowDate && k.toDate.toString().trim().slice(0, -2).indexOf(this.filter) > -1 :
            dateNow <= this.nowDate;
          });

          this.dataService.getOrganizations().subscribe(
            orgs => {
              for (const proj of projects) {
                proj['organization'] = orgs.filter((v, k) => {
                  return v.id === proj.organizationId;
                })[0];

                delete proj.organizationId;
                delete proj.organizationName;
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
        case 'dueDate': [propertyA, propertyB] = [a.toDate, b.toDate]; break;
/*         case 'closedDate': [propertyA, propertyB] = [<string>a.closedDate, <string>b.closedDate]; break;
 */      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sorter.direction === 'asc' ? 1 : -1);
    });
  }
}

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
      { label: 'order',             value: '#' },
      { label: 'projectName',       value: 'title' },
      { label: 'projectId',         value: 'proj. ID' },
      { label: 'projectManager',    value: 'manager' },
      { label: 'fromDate',          value: 'start (date)' },
      { label: 'toDate',            value: 'closed (date)' },
      { label: 'address',           value: 'address' },
      { label: 'location',          value: 'geolocation' },
      { label: 'neededFunding',     value: 'funding goal' },
      { label: 'raisedFunding',     value: 'collected amount' },
      { label: 'description',       value: 'description' },
      { label: 'mainImage',         value: 'logo' },
      { label: 'images',            value: 'gallery' },
      { label: 'organizationName',  value: 'org. name' },
      { label: 'organizationId',    value: 'org. ID' },
      { label: 'open',              value: 'active' },
      { label: 'bankAccount',       value: 'bank account' }
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
