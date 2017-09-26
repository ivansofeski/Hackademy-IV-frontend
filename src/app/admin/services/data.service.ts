import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private subject = new Subject<any>();

  send(data: any) {
    this.subject.next(data);
  }

  get() {
    return this.subject.asObservable();
  }

}
