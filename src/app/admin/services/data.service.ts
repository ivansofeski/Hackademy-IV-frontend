import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/Observable/throw';

@Injectable()
export class DataService {
  paths = {
    root: '../../../assets/mockdata/',
    organizations: 'organizations.json',
    projects: 'projects.json'
  };

  private _get(path: string): Observable<any> {
    if (path === undefined) {
      return;
    }

    return this.http.get(path)
      .do((data: Response) => {
        return data !== undefined ? data : [];
      })
      .catch((error: Response) => {
        console.log(error['message']);
        return Observable.throw(error || 'Server error');
      });
  }

  private _set(path: string, data: any): boolean {
    // tslint:disable-next-line:prefer-const
    let _inserted = false;

    return _inserted;
  }

  // tslint:disable-next-line:member-ordering
  get = {
    organizations: (): any => {
      return this._get(this.paths.root + this.paths.organizations);
    },
    projects: (): any => {
      return this._get(this.paths.root + this.paths.projects);
    }
  };

  // tslint:disable-next-line:member-ordering
  set = {
    organizations: (data: any): boolean => {
      return this._set(data, this.paths.root + this.paths.organizations);
    },
    projects: (data: any): boolean => {
      return this._set(data, this.paths.root + this.paths.projects);
    }
  };

  constructor(private http: HttpClient) { }
}
