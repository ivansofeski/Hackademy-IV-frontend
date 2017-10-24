import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

// Services
import { DataService } from '../../shared/services/data.service';
import { Project } from '../../interfaces/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
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
  }
  // constructor( public router: Router, private dataService: DataService) { }

  // ngOnInit() {
  //   this.dataService.getProjects().subscribe(
  //     res => {
  //       //console.log(res);
  //       this.proList = res;
  //     },
  //     error => this.errors.push(error)
  //   );
  // }
}

