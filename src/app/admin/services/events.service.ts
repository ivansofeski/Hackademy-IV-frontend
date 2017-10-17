import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

// Interfaces
import { Project } from '../interface/project';

@Injectable()
export class EventsService {
 private _project: Subject<Object> = new BehaviorSubject<Object>({});
 project: Observable<Object> = this._project.asObservable();

 storeProject: Function = (data: Object) => {
   this._project.next(data);
 }

 constructor() { }
}
