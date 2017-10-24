import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

// Interfaces
import { Organization } from '../../interfaces/organization';
import { Project } from '../../interfaces/project';
import { Activity } from '../../interfaces/activity';
import { Subject, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class DataService {
  /**
   * @property
   * `_paths` is an JS Object that enables the user a segmented view of _paths/links,
   * where `root` must always be supplied in conjuction with another property.
   *
   * E.g.: `this._paths.root` + `this._paths.anyOtherProperty`, where the latter is one of the predefined
   * properties of the `_paths`.
   */
  private _paths = {
    root: '../../../assets/mockdata/',
    organizations: 'organizations.json',
    projects: 'projects.json',
    activities: 'activities.json',
    projectByProjectId: 'getprojectbyprojectid/',
    projectById: 'getprojectbyid/',

  };

  private _backendPaths = {
    root: 'http://18.221.31.52:8080/nano-1.0/api/',
    organizations: 'org/getall',
    projects: 'getlistofprojects',
    projectByProjectId: 'getprojectbyprojectid/',
    projectById: 'getprojectbyid/',
    activities: 'getlistofactivities'
  };

  /**
   * @property Used to pass stored data from one parent component to a router outlet inside it.
   */
  private _project: Subject<Object> = new BehaviorSubject<Object>({});
  /**
   * @property Subscribable property in order to provide previously stored relevant private property from a parent component.
   */
  project: Observable<Object> = this._project.asObservable();

  /**
   * @property Function to set the private property `_project`. User must supply `data` as an object of unspecified properties
   * to set a private property so that it can be accessible by another router outlet by subcribing to it later.
   */
  storeProject: Function = (data: Object) => {
    this._project.next(data);
  }


  /**
   * @argument path as a string e.g. (API) `'/someurlsegment/api/'` or (file) `'/somepath/somefile.json'`
   * @argument options as JS Object as optional
   * E.g. `{ id: 1 }` or multiple properties `{ name: 'someName', 'date': '2018/01/01' }`
   * @description
   * Function that retrieves data from an API (or a string path) with HttpClient GET method.
   * It provides both parameterized and non-parameterized call methods depending on what use provide.
   * @return an `Observable` of any depending on where or what API was provided in the request.
   */
  private _get(path: string, options?: Object): Observable<any> {
    if (path === undefined) {
      return;
    }

    // tslint:disable-next-line:prefer-const
    let _params = new HttpParams();

    if (options !== undefined && Object.keys(options).length > 0) {
      for (const option in options) {
        if (options.hasOwnProperty(option)) {
          _params.set(option, options[option]);
        }
      }
    }

    // Even if the `params` is blank/unset it will still execute a clean Http GET call.
    return this.http.get(path, { params: _params })
    .do((data: Response) => {
      return data !== undefined ? data : [];
    })
    .catch((error: Response) => {
      return Observable.throw(error || 'Server error');
    });
  }

  /**
   * @argument path as string e.g. (API) '/someurlsegment/api/' or (file) '/somepath/somefile.json'
   * 'options' as JS Object as optional e.g. { id: 1 } or multiple properties { name: 'someName', 'date': '2018/01/01' }
   * @description
   * Function that sends data to an API (or a string path) with HttpClient POST/PUT method(s).
   * It provides both parameterized and non-parameterized call methods depending on what use provide.
   *
   * @experimental
   * Under construction!
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  private _set(path: string, data: any): boolean {
    const _inserted = false;

    return _inserted;
  }

  /**
   * @description
   * GET all Projects records.
   *
   * Returns an Observable Array of `Organization`(interface).
   *
   * @return an Observable Array of `Organization`(interface).
   */
  getOrganizations(): Observable<Organization[]> {
    return this._get(this._paths.root + this._paths.organizations);
  }

  /**
   * @param options Accepts minimum 1 key+value pair from the Organization interface.
   *
   * @description
   * GET only 1 Organization record data with parameterized query.
   * `options` is an Object argument which should have at least 1 property + value.
   *
   * Returns an Observable of `Organization`(interface).
   *
   * @returns an Observable of `Organization`(interface).
   */
  getOrganization(options: Object): Observable<Organization> {
    if (options === undefined || typeof options === 'object' || Object.keys(options).length <= 0) {
      return;
    }

    return this._get(this._paths.root + this._paths.organizations, options);
  }

  /**
   * @description
   * GET all Projects records.
   *
   * Returns an Observable Array of `Project`(interface).
   *
   * @returns an Observable Array of `Project`(interface).
   */
  getProjects(): Observable<Project[]> {
    return this._get(this._paths.root + this._paths.projects);
  }

  /**
   * @argument options Accepts minimum 1 key+value pair from the Project interface.
   *
   * @description
   * GET only 1 Project record data with parameterized query.
   * `options` is an Object argument which should have at least 1 property + value.
   *
   * Returns an Observable of `Project`(interface).
   *
   * @returns an Observable of `Project`(interface).
   */
  getProject(options: Object): Observable<Project> {
    if (options === undefined || typeof options === 'object' || Object.keys(options).length <= 0) {
      return;
    }

    return this._get(this._paths.root + this._paths.projects, options);
  }

  getProjectById(id:number){
    return this._get(this._paths.root + this._paths.projectById + id);
  }
  
  getProjectByProjectId(projectId: string){
    return this._get(this._paths.root + this._paths.projectByProjectId + projectId);
  }

  /**
   * @description
   * GET all activity records.
   *
   * Returns an Observable Array of `Activity`(interface).
   *
   * @returns an Observable Array of `Activity`(interface).
   */
  getActivities(): Observable<Activity[]> {
    return this._get(this._paths.root + this._paths.activities);
  }

  /**
   * @param http An instance of HttpClient to enable functions in this service to use HTTP requests like GET, POST, PUT etc.
   */
  constructor(private http: HttpClient) {
    this._paths = this._backendPaths;
   }

  /* ////////////////////////////////////////////////////////////////////////
  *  /////////////////////////                      /////////////////////////
  *  ///////////////////////// TESTING PURPOSE ONLY /////////////////////////
  *  /////////////////////////                      /////////////////////////
  *  ////////////////////////////////////////////////////////////////////////
  */
}
