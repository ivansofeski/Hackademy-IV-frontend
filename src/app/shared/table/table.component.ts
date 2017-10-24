import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import '../rxjs.operators';

let lastSorted = {
  column: '',
  order: ''
};

@Component({
  selector: 'app-admin-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  @Input() tableData;
  @Input() columns;
  @ViewChild(MatSort) sort: MatSort;

  private _dataSource: AdminTableDataSource;

  get dataSource(): AdminTableDataSource {
    return new AdminTableDataSource(this.tableData, this.columns.visible, this.sort);
  }

  validateProperties: Function = (_tableData?: any[]): boolean => {
    switch (true) {
      case this.columns === undefined:
      case this.tableData.length <= 0:
      case !this.columns.hasOwnProperty('all'):
      case !this.columns.hasOwnProperty('visible'):
      case this.columns.all.length <= 0:
      case this.columns.visible.length <= 0:
        return false;
      default:
        return true;
    }
  }

  insertValues: Function = (label: string, row: any): string => {
    if (label === undefined || typeof label !== 'string' || label.trim().length <= 0 || row === undefined) {
      return;
    }

    let _value = '';

    switch (label) {
      case 'person':
      case 'phone':
      case 'email':
        _value = row.contact[label];
        break;
      case 'order':
        _value = (this.dataSource.subject.value.indexOf(row) + 1).toString();
        break;
      case 'orgLogo':
      case 'mainImage':
        _value = `<img class="org-logo" src="${row[label]}"/>`;
        break;
      default:
        _value = row[label];
        break;
    }

    return _value;
  }

  checkColumn: Function = (column: string): boolean => {
    if (!column || typeof column !== 'string' || column.length <= 0) {
      return;
    }

    let _validate = false;
    column = column.trim().toLowerCase();

    switch (true) {
      case column === 'name':
      case column === 'organizationname':
      case column === 'projectname':
        _validate = true;
        break;
      default:
        _validate = false;
        break;
    }

    return _validate;
  }

  getLink: Function = (column: string, row: any): string => {
    if (!column || typeof column !== 'string' || column.length <= 0 || !row || typeof row !== 'object' || Object.keys(row).length <= 0) {
      return;
    }

    const root = this.route.parent.snapshot.url.toString();
    let selector = '';
    let id;

    switch (true) {
      case column === 'name':
        selector = 'organizations/view';
        id = row.id;
        break;
      case column === 'organizationName':
        selector = 'organizations/view';
        id = row.organizationId;
        break;
      case column === 'projectName':
        selector = 'projects/view';
        id = row.id ? row.id : (Array.from(this.tableData).indexOf(row) + 1).toString();
        break;
      default:
        break;
    }

    const _link = '/' + [ root, selector, id ].join('/');

    return _link;
  }

  /* instanceOfOrganization: Function = (object: any): object is Organization => {
    return 'orgId' in object;
  }

  instanceOfProject: Function = (object: any): object is Project => {
    return 'projectId' in object;
  } */

  ngOnInit() {
    if (this.validateProperties && this.validateProperties()) {
      this._dataSource = this.dataSource;
    }
  }

  constructor(private route: ActivatedRoute) { }
}

export class AdminTableDataSource extends DataSource<any> {
  subject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  showSortingArrow: Function = (): void => {
    if (!this._sorter || !this._sorter.active) {
      return;
    }

    const header = document.querySelectorAll('.mat-column-' + this._sorter.active)[0];
    const lastSortedHeader = document.querySelectorAll('[sorted="true"]')[0];

    if (header && header) {
      header.setAttribute('sorted', 'true');
      header.setAttribute('dir', this._sorter.direction);
    }

    if (lastSortedHeader && lastSortedHeader !== header) {
      lastSortedHeader.setAttribute('sorted', 'false');
      lastSortedHeader.removeAttribute('dir');
    }
  }

  initSorting: Function = (sorters: string[]): any[] => {
    let data = this.subject.value.slice();

    if (!this._sorter.active || this._sorter.direction === '') {
      return data;
    }

    data = data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      for (const colName of sorters) {
        if (this._sorter.active === colName) {
          [propertyA, propertyB] = [a[colName], b[colName]];
          break;
        }
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      const _sort = (valueA < valueB ? -1 : 1) * (this._sorter.direction === 'asc' ? 1 : -1);

      return _sort;
    });

    return data;
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.subject,
      this._sorter.sortChange
    ];

    if (!this.subject.isStopped) {
      this.showSortingArrow();

      return Observable.merge(...displayDataChanges).map(() => {
        return this.initSorting(this._sortableColumns);
      });
    }
  }

  disconnect() {
    this.subject.complete();
    this.subject.observers = [];
  }

  constructor(private _data: any[], private _sortableColumns: string[], private _sorter: MatSort) {
    super();

    this.subject.next(_data);
  }
}
