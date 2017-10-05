import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {ProjectService} from '../project.service';


@Component({
  //selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnChanges {
  errors: any[] = [];
  projectList: any[] = [];
  
  donatedAmount={};
  color = 'primary';
  mode = 'determinate';

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

  ngOnChanges(ID){
    console.log('Something changed',ID);
    let proj =this.projectList.find(o => o.id === ID);
    proj.raisedFunding = proj.raisedFunding+10000;
  }
}
