import { Component, OnInit, ViewChildren, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.interface';
import { Activity } from '../activity.interface';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit  {
  _projectId: number;
  project: any;  
  projectActivities: Activity[];
  errors: any[] = [];

  donateOption1= 10;
  donateOption2= 25;
  donateOption3= 50;


  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    private projectService: ProjectService) { }


  
  
  ngOnInit() {
    this._projectId = +this.route.snapshot.paramMap.get('id');
    console.log(this._projectId)
    let project_activity = this.projectService.getProjectActivities(this._projectId)
    let project = this.projectService.getSelectedProject(this._projectId);
    project.subscribe(
      res => {
        console.log(res)
        this.project = res;
      },
      error => this.errors.push(error)
    );
    project_activity.subscribe(
      res => {
         console.log(res)
        this.projectActivities = res;
      },
      error => this.errors.push(error)
    );
      
  }

}
