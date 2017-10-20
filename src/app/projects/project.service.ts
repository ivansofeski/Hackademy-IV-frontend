import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/Observable/throw';
import {Observable} from 'rxjs/Observable';
import {Project} from './project.interface';
import {Activity} from './activity.interface';

@Injectable()
export class ProjectService {
  _projectUrl = '../assets/mockdata/projects.json';
  _activityUrl = '../assets/mockdata/activities.json';

  constructor(private _http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return this._http.get<Project[]>(this._projectUrl)
      .do(data => console.log('info about projects is being retrieved---' + data.length))
      .catch(this.handlerError);
  }

  getTargettedProjects(indexes: any[]): Observable<Project[]> {
    return this._http.get<Project[]>(this._projectUrl)
      .map(projects => projects.filter(<Project>(project) => {
          for (let id of indexes) {
            if (project.id === id) {
              return true;
            }
          }
        })
      )
      .catch(this.handlerError);
  }

  getSelectedProject(projectId: number): Observable<Project> {
    return this._http.get<Project[]>(this._projectUrl)
      .map(projects => (projects.find(project => project.id == projectId)))
      // .do(project => {console.log("the project with" + projectId +" has been requested:")
      // console.log(project)})
      .catch(this.handlerError);
  }

  getProjectActivities(projectId: number): Observable<Activity[]> {
    return this._http.get<Activity[]>(this._activityUrl)
      .map(activities => (activities.filter((k, v) => k.projectId == projectId)))
      // .do(project => {console.log("the events with" + projectId +" has been requested:")
      // console.log(project)})
      .catch(this.handlerError);
  }

  private handlerError(err: HttpErrorResponse) {
    return Observable.throw(err.message);
  }

}
