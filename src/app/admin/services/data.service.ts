import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  get(path: string): Observable<any> {
    if (path === undefined) {
      return;
    }

    return this.http.get(path)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  set(data: any): void {

  }

  private handleError(errorResponse: Response) {
    console.log(errorResponse['message']);
    return Observable.throw(errorResponse.json().error || 'Server error');
  }
}
