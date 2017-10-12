import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { Organization } from '../interface/organization';

/**
 *
 *
 * @export
 * @class OrganizationListComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
/** */
export class OrganizationListComponent implements OnInit, OnDestroy {
  dataSource: OrganizationDataSource | null;
  displayedColumns = ['id', 'orgId', 'name', 'address', 'person', 'email', 'phone'];

  @ViewChild(MatSort) sort: MatSort;

  // Constructor here
  constructor(private _dataService: DataService, private _router: Router ) {
  }

  ngOnInit() {
    this.dataSource = new OrganizationDataSource(this._dataService, this.sort);
    console.log('this.datasource', this.dataSource);
  }

  ngOnDestroy(): void { }

  handleRowClick(row) {
    // alert('your click on the row with the organization  name ' + row.name);
    this._router.navigateByUrl('/admin/organizations/view/' + row.id);
  }


}

export class OrganizationDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  errors: any[] = [];
  orgList: Organization[];

  constructor(private _serviceFetch: DataService, private _sorter: MatSort) {
    super();
  }


  subject: BehaviorSubject<Organization[]> = new BehaviorSubject<Organization[]>([]);

  connect(): Observable<Organization[]> {

    const displayDataChanges = [
      this.subject,
      this._sorter.sortChange
    ];

    if (!this.subject.isStopped) {
      this._serviceFetch.getOrganizations()
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
    console.log('disconnected!');
  }

  getSortedData(): Organization[] {
    const data = this.subject.value.slice();

    if (!this._sorter.active || this._sorter.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sorter.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'orgId': [propertyA, propertyB] = [a.orgId, b.orgId]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'address': [propertyA, propertyB] = [a.address, b.address]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sorter.direction === 'asc' ? 1 : -1);
    });
  }
}
