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

  private _get(path: string, options?: Object): Observable<any> {
    if (path === undefined) {
      return;
    }

    if (options !== undefined && Object.keys(options).length > 0) {
      // tslint:disable-next-line:prefer-const
      for (let key in options) {
        if (options.hasOwnProperty(key)) {
          // tslint:disable-next-line:prefer-const
          let _query = `${key}='${options[key]}'`;
          path += _query;
        }
      }
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

  // Subject to change get => loadData/getData/grab etc.
  // tslint:disable-next-line:member-ordering
  get = {
    organization: (options: Object): any => {
      return this._get(this.paths.root + this.paths.organizations, options);
    },
    organizations: (): any => {
      return this._get(this.paths.root + this.paths.organizations);
    },
    project: (options: Object): any => {
      return this._get(this.paths.root + this.paths.projects, options);
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
