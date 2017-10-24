import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatPaginator, MatSort } from '@angular/material';
import '../rxjs.operators';

// Services

// Interfaces

@Component({
  selector: 'app-admin-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  @Input() tableData;
  @Input() columns;
  @ViewChild(MatSort) sort: MatSort;
  errors: any[] = [];

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

  getLink: Function = (row: any): string => {
    if (!row || typeof row !== 'object' || Object.keys(row).length <= 0) {
      return;
    }

    const _link = [
      this.route.parent.snapshot.url.toString(),
      this.route.snapshot.url.toString(),
      'view',
      row.id ? row.id : (Array.from(this.tableData).indexOf(row) + 1).toString()
    ];

    return '/' + _link.join('/');
  }

  ngOnInit() {
    if (this.validateProperties && this.validateProperties()) {
      this._dataSource = this.dataSource;
    }
  }

  constructor(private route: ActivatedRoute) { }
}

export class AdminTableDataSource extends DataSource<any> {
  subject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  sort: Function = (sorters: string[]): any[] => {
    const data = this.subject.value.slice();

    if (!this._sorter.active || this._sorter.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
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

      return (valueA < valueB ? -1 : 1) * (this._sorter.direction === 'asc' ? 1 : -1);
    });
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.subject,
      this._sorter.sortChange
    ];

    if (!this.subject.isStopped) {
      return Observable.merge(...displayDataChanges).map(() => {
        return this.sort(this._sortableColumns);
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
