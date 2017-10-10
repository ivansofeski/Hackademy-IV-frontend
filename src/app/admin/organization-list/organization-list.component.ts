import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { Organization } from '../interface/organization';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})

export class OrganizationListComponent implements OnInit, OnDestroy {
  dataSource: OrganizationDataSource | null;


  // Constructor here
  constructor(private _dataService: DataService) {
    // _dataService.getOrganizations().subscribe(
    //   res => {
    //     // console.log('first', res);
    //     this.dataSource = new OrganizationDataSource(res);
    //     console.log('this.dataSource', this.dataSource);
    //   },
    //   error => console.log(error)
    // );
  }

  ngOnInit() {
    this.dataSource = new OrganizationDataSource(this._dataService);
    console.log('this.datasource', this.dataSource);
  }

  ngOnDestroy(): void { }


}

export class OrganizationDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  errors: any[] = [];
  orgList: Organization[];

  constructor( private _serviceFetch?: DataService) {
    super();
  }


    subject: BehaviorSubject<Organization[]> = new BehaviorSubject<Organization[]>([]);

    connect(): Observable<Organization[]> {
        console.log('connect');
        if (!this.subject.isStopped) {

          this._serviceFetch.getOrganizations()
          .subscribe(res => {
              console.log(res);
              this.subject.next(res);
              console.log('this.subject.next(res)', this.subject);
          });
  return Observable.merge(this.subject);
        }
    }
    disconnect() {
        this.subject.complete();
        this.subject.observers = [];
    }
  }

//   connect(): Observable<Organization[]> {
//     console.log('Connect');
//     /* this._serviceFetch.getOrganizations().subscribe(
//       res => {
//         // console.log('first', res);
//         this.orgList = res;
//         console.log('this.orgList', this.orgList);
//         return Observable.of(this.orgList);
//       },
//       error => this.errors.push(error)
//     ); */
//     // console.log(this.orgList);
//     return Observable.of(this.data);
//   }

//   disconnect() { }
// }
