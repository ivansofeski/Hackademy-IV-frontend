import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/Observable/throw';
import {Observable} from 'rxjs/Observable';
import { Project } from './project.interface';

@Injectable()
export class ProjectService {
  _projectUrl = '../assets/mockdata/projects.json';
  constructor(private _http: HttpClient){}

  getProjects(): Observable <Project[]> {
    return this._http.get<Project[]>(this._projectUrl)
                .do(data => console.log('info about projects is being retrieved---' + data.length))
                .catch(this.handlerError);
  }

  private handlerError(err: HttpErrorResponse){
    return Observable.throw(err.message);
  }

}
