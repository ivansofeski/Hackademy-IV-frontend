import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  private paths = {
    root          : '../../../assets/mockdata/',
    organizations : 'organizations.json',
    projects      : 'projects.json'
  };

  private _get(path: string): Observable<any> {
    if (path === undefined) {
      return;
    }

    this.http.get(path)
      .catch((error: Response) => {
        console.log(error['message']);
        return Observable.throw(error.json().error || 'Server error');
      })
      .subscribe(result => {
        console.log(result);
        return result;
      });
  }

  /* private _set(path: string, data: any): boolean {
    let _inserted = false;

    return _inserted;
  } */

  // tslint:disable-next-line:member-ordering
  get = {
    organizations: () => {
      return this._get(this.paths.root + this.paths.organizations);
    },
    projects: () => {
      return this._get(this.paths.root + this.paths.projects);
    }
  };

  // tslint:disable-next-line:member-ordering
  set = {
    organizations: (data: any) => {
      return this._set(data, this.paths.root + this.paths.organizations);
    },
    projects: (data: any) => {
      return this._set(data, this.paths.root + this.paths.projects);
    }
  };

  constructor(private http: HttpClient) { }
}
