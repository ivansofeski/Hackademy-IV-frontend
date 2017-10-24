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
<<<<<<< HEAD
export class ProjectListComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  proList: any[];
  projectId: number = 0;
  project: any;
  errors: any[] = [];
  dataSource: ProjectDataSource | null;
  displayedColumns = ['picture', 'projectName', 'fromDate', 'toDate', 'goal', 'funded'];

  @ViewChild(MatSort) sort: MatSort;

  // Constructor here
  constructor(private _dataService: DataService, private _router: Router ) {
  }

  ngOnInit() {
    this.dataSource = new ProjectDataSource(this._dataService, this.sort);
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
  orgList: Project[];

  constructor(private _serviceFetch: DataService, private _sorter: MatSort) {
    super();
  }


  subject: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  connect(): Observable<Project[]> {

    const displayDataChanges = [
      this.subject,
      this._sorter.sortChange
    ];

    if (!this.subject.isStopped) {
      this._serviceFetch.getProjects()
        .subscribe(res => {
          this.subject.next(res);
        });
      return Observable.merge(...displayDataChanges).map(() => {
        return this.getSortedData();
      });
    }
  }

  disconnect() {
    this.subject.complete();
    this.subject.observers = [];
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
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
//        case 'fromDate': [propertyA, propertyB] = [a.toDate, b.toDate]; break;
//        case 'toDate': [propertyA, propertyB] = [a.toDate, b.toDate]; break;
        case 'projectName': [propertyA, propertyB] = [a.projectName, b.projectName]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sorter.direction === 'asc' ? 1 : -1);
    });
=======

export class OrganizationListComponent implements OnInit {
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
   */
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
>>>>>>> Updated Project-List Component to reflect the changes for Table Child Component
  }

  constructor(private _dataService: DataService) { }
}
