import { Activity } from '../interface/activity';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

// Interfaces
import { Project } from '../interface/project';

@Injectable()
export class ActivitiesService {
// Url to get the list of activity
_activityUrl = '../assets/mockdata/activities.json';

 private _project: Subject<Object> = new BehaviorSubject<Object>({});
 private _activity: Subject<object> = new BehaviorSubject<object>({});
 project: Observable<Object> = this._project.asObservable();
 activity: Observable<object> = this._activity.asObservable();

 storeProject: Function = (data: Object) => {
   this._project.next(data);
 }


getProjectActivities(projectId: number): Observable <Activity[]> {
  return this._http.get<Activity[]>(this._activityUrl)
  .map(activities => (activities.filter((k, v) => k.projectId === projectId)))
  .catch(this.handlerError);
}

private handlerError(err: HttpErrorResponse){
  return Observable.throw(err.message);
}

 constructor(private _http: HttpClient) { }
}
