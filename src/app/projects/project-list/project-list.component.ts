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
  
  donatedAmount={};
  color = 'primary';
  mode = 'determinate';

  donateOption1=10;
  donateOption2=25;
  donateOption3=50;
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

  // onClick(ID){
  //   console.log('Something changed',ID);
  //   let proj =this.projectList.find(o => o.id === ID);
  //   proj.raisedFunding = proj.raisedFunding+10000;
  // }
}
