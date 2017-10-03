import { Component, OnInit, Input } from '@angular/core';
import {ProjectService} from '../project.service';

@Component({
  //selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  errors: any[] = [];
  projectList: any[] = [];

  color = 'primary';
  mode = 'determinate';
  // value;
  // bufferValue;

  constructor(private _projectService: ProjectService) { }

  ngOnInit() {
    this._projectService.getProjects().subscribe(
      res => {
        console.log(res);
        this.projectList = res;
      },
      error => this.errors.push(error)
    );
  }

}
