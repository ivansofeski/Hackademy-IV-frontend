import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Donor} from '../donor.interface';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/Observable/throw';

@Injectable()
export class DonorOverviewService {
  _donorUrl = '../../assets/mockdata/donor.json';

  constructor(private _http: HttpClient) {
  }

  getDonors(): Observable<Donor[]> {
    return this._http.get<Donor[]>(this._donorUrl)
      .do(data => console.log('info about projects is being retrieved---' + data.length))
      .catch(this.handlerError);
  }

  private handlerError(err: HttpErrorResponse) {
    return Observable.throw(err.message);
  }
}
