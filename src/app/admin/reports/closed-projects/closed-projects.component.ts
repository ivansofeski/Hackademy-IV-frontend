import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewProject } from '../../interface/project';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { FormControl, Validators } from '@angular/forms';


const monthAsMicroSeconds = 30*24*60*60*1000;

@Component({
  selector: 'app-closed-projects',
  templateUrl: './closed-projects.component.html',
  styleUrls: ['./closed-projects.component.scss']
})

export class ClosedProjectsComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';

  controls = {
    toDate:     new FormControl(new Date(), [Validators.required]),
    fromDate:   new FormControl(new Date(new Date().valueOf() - monthAsMicroSeconds), [Validators.required]),
  };
  
  errors: any[] = [];
  dataSource: ProjectDataSource | null;
  displayedColumns = ['projectName', 'orgName', 'bankAccount', 'fundsRaised', 'dueDate', 'closedDate'];

  @ViewChild(MatSort) sort: MatSort;

  // Constructor here
  constructor(private _dataService: DataService, private _router: Router) {
  }

  filterProjects(){
    this.dataSource.fromDate = this.controls.fromDate.value;
    this.dataSource.toDate = this.controls.toDate.value;
    this.dataSource.connect();
  }

  ngOnInit() {
    this.dataSource = new ProjectDataSource(this._dataService, this.sort);
  }

  ngOnDestroy(): void { }
}

export class ProjectDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  errors: any[] = [];

  fromDate:Date = new Date(new Date().valueOf() - monthAsMicroSeconds);
  toDate:Date = new Date();


  constructor(private dataService: DataService, private _sorter: MatSort) {
    super();
  }


  subject: BehaviorSubject<NewProject[]> = new BehaviorSubject<NewProject[]>([]);

  connect(): Observable<NewProject[]> {

    const displayDataChanges = [
      this.subject,
      this._sorter.sortChange
    ];

    if (!this.subject.isStopped) {
      this.dataService.getNewProjects().subscribe(
        projects => {
          projects = projects.filter((v, k) => {
            return v.status === 'false';
          });

          this.dataService.getNewOrganizations().subscribe(
            orgs => {
              for (const proj of projects) {
                proj['organization'] = orgs.filter((v, k) => {
                  return v.id === proj.orgId;
                })[0];

                delete proj.orgId;
                delete proj.organizationName;
              }

              this.subject.next(projects);
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

  getSortedData(): NewProject[] {
    let data = this.subject.value.slice();
    data = data.filter((v,k) => {
      let date = new Date(<string>v.closedDate);
      return date >= this.fromDate && date <= this.toDate
    });
    
    if (!this._sorter.active || this._sorter.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      ['projectName', 'orgName', 'bankAccount', 'fundsRaised', 'dueDate', 'closedDate']
      switch (this._sorter.active) {
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'orgName': [propertyA, propertyB] = [a['organization'].name, b['organization'].name]; break;
        case 'bankAccount': [propertyA, propertyB] = [a['organization'].bankAccount, b['organization'].bankAccount]; break;
        case 'fundsRaised': [propertyA, propertyB] = [a.fundsRaised, b.fundsRaised]; break;
        case 'dueDate': [propertyA, propertyB] = [a.dueDate, b.dueDate]; break;
        case 'closedDate': [propertyA, propertyB] = [<string>a.closedDate, <string>b.closedDate]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sorter.direction === 'asc' ? 1 : -1);
    });
  }
}
