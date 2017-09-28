import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/Observable/throw';
import { Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class DataService {
  paths = {
    root: '../../../assets/mockdata/',
    organizations: 'organizations.json',
    projects: 'projects.json'
  };

  loadData = {
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

  setData = {
    organizations: (data: any): void => {
      return this._set(data, this.paths.root + this.paths.organizations);
    },
    projects: (data: any): void => {
      return this._set(data, this.paths.root + this.paths.projects);
    }
  };

  private _get(path: string, options?: Object): Observable<any> {
    if (path === undefined) {
      return;
    }

    return this.http.get(path, options !== undefined ? options : '')
      .do((data: Response) => {
        return data !== undefined ? data : [];
      })
      .catch((error: Response) => {
        console.log(error['message']);
        return Observable.throw(error || 'Server error');
      });
  }

  private _set(path: string, data: any): void {
    if (path === undefined || data === undefined) {
      return;
    }

    const methods = { post: 'POST', put: 'PUT' };
    const _data = JSON.stringify(data);
    const _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const _options = {
      headers: _headers
      // params: new HttpParams().set('id', '3'),
      // reportProgress: true
    };

    const req = new HttpRequest(methods.put, path, _data, _options);

    this.http
      .request(req)
      .do(res => {
        return true;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  constructor(private http: HttpClient) { }
}
